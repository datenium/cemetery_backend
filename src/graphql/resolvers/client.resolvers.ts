import { combineResolvers } from "graphql-resolvers";
import { errors } from "../../miscl";
import { GraphQLError } from "graphql";
import {
  Client,
  MutationCreateClientArgs,
  QueryClientArgs,
} from "../../generated/graphql";
import { ServerContext } from "../../utils/interfaces";
import { isSuperAdmin } from "./authorization";

export default {
  Query: {
    client: combineResolvers(
      isSuperAdmin,
      async (parent: Client, args: QueryClientArgs, context: ServerContext) => {
        const { dbclient, me, redis } = context;
        const { id } = args;
        try {
          const client = await dbclient.client.findUnique({ where: { id } });

          return client;
        } catch (err) {
          throw new GraphQLError(errors.ROLE_NOT_FOUND);
        }
      }
    ),
    clients: combineResolvers(
      async (parent: Client, args: any, context: ServerContext) => {
        const { dbclient, me, redis } = context;
        try {
          const _clients = await dbclient.client.findMany();

          return _clients;
        } catch (err) {
          throw new GraphQLError(errors.ROLE_NOT_FOUND);
        }
      },
      isSuperAdmin
    ),
  },
  Mutation: {
    createClient: combineResolvers(
      isSuperAdmin,
      async (
        parent: Client,
        { input }: MutationCreateClientArgs,
        context: ServerContext
      ) => {
        const { dbclient, me, redis } = context;
        const { name, client_type, description, address } = input;

        try {
          const client = await dbclient.client.create({
            data: {
              name,
              client_type,
              description,
              address: {
                create: { ...address },
              },
            },
          });
          return client;
        } catch (err) {
          throw new GraphQLError(errors.COULD_NOT_CREATE_ROLE);
        }
      }
    ),
  },
  Client: {
    address: async (parent: Client, args: any, context: ServerContext) => {
      const { dbclient, me, redis } = context;
      const { addressId } = parent;
      try {
        const address = await dbclient.address.findUnique({
          where: { id: addressId },
        });

        return address;
      } catch (err) {
        throw new GraphQLError(errors.ADDRESS_NOT_FOUND);
      }
    },
  },
};
