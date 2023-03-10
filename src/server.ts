import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { Request } from "express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { GraphQLSchema } from "graphql/type";
import { JwtPayload } from "jsonwebtoken";
import { isArray } from "lodash";
import { createServer } from "http";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { connectDb, pubsub, RedisCache } from "./database";
import { validateToken } from "./utils/helpers";
import { ServerContext } from "./utils/interfaces";
import { settings } from "./config";
import logger from "./utils/logger";

export const initializeServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: settings.WS_PATH,
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const getMe = async (req: Request): Promise<JwtPayload | undefined> => {
    const token = req.headers.token;
    if (!token || Boolean(isArray(token))) {
      return undefined;
    }
    try {
      return validateToken(token as string);
    } catch (err) {
      return undefined;
    }
  };

  const server = new ApolloServer<ServerContext>({
    schema,
    csrfPrevention: true,
    formatError: (error) => {
      const message = error.message
        .replace("PrismaValidationError: :", "")
        .replace("Validation error: ", "");
      return { ...error, message };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    settings.GQL_PATH,
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
        me: await getMe(req),
        x_auth_token_info: {
          x_auth_token: req.headers.x_auth_token,
          x_auth_id: req.headers.x_auth_id,
        },
        dbclient: await connectDb(),
        redis: await RedisCache(),
        pubsub,
        logger,
      }),
    })
  );
  return httpServer;
};
