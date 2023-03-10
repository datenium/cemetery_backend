import { combineResolvers } from "graphql-resolvers";
import { GraphQLError } from "graphql";
import {
  RedisCacheParams,
  RedisClientParams,
  ServerContext,
} from "../../utils/interfaces";
import { errors } from "../../miscl";
import {
  MutationActivateUserArgs,
  MutationChangeRoleArgs,
  MutationConfirmUserArgs,
  MutationCreateUserArgs,
  MutationSignInArgs,
  QueryUserArgs,
  User,
} from "../../generated/graphql";
import {
  createJwtToken,
  generateHash,
  validateHash,
} from "../../utils/helpers";
import { TOKEN_AGE } from "../../config";
import { isAdmin, isAuthenticated, isSuperAdmin } from "./authorization";
import { getCached } from "../../database/redisCache";

const getRedisParams = ({
  me,
  resource,
  id = undefined,
}: RedisCacheParams): RedisClientParams => {
  if (!me) throw new Error(errors.TOKEN_NOT_FOUND);
  const { clientId } = me;
  return {
    clientId,
    params: {
      store: `${clientId}:${resource}`,
      path: !id ? "$.[*]" : `$.[?(@.id=="${id}" && @.clientId=="${clientId}")]`,
    },
  };
};

export default {
  Query: {
    me: combineResolvers(
      isAuthenticated,
      async (parent: any, args: any, context: ServerContext) => {
        const { dbclient, me, redis } = context;
        if (!me) throw new GraphQLError(errors.NOT_AUTHENTICATED);
        const { id } = me;
        const {
          clientId,
          params: { store, path },
        } = getRedisParams({ me, resource: "user", id });
        try {
          const user = await getCached<User[]>(redis, { store, path });
          if (user) {
            return user[0];
          } else {
            const user = await dbclient.user.findUnique({ where: { id } });
            await redis.json.set(store, "$", user);
            return user;
          }
        } catch (err) {
          throw new GraphQLError(errors.CONNECTION_FAILED);
        }
      }
    ),
    user: combineResolvers(
      isAuthenticated,
      async (parent: any, args: QueryUserArgs, context: ServerContext) => {
        const { dbclient, me, redis } = context;
        const { id } = args;
        const {
          clientId,
          params: { store, path },
        } = getRedisParams({ me, resource: "user", id });
        try {
          const user = await getCached<User[]>(redis, { store, path });
          if (user) {
            return user[0];
          } else {
            const user = await dbclient.user.findUnique({ where: { id } });
            await redis.json.set(store, "$", user);
            return user;
          }
        } catch (err) {
          throw new GraphQLError(errors.CONNECTION_FAILED);
        }
      }
    ),
    users: combineResolvers(
      isSuperAdmin,
      async (parent: any, args: any, context: ServerContext) => {
        const { dbclient, me, redis } = context;
        const {
          clientId,
          params: { store, path },
        } = getRedisParams({ me, resource: "user" });
        try {
          const users = await getCached<User[]>(redis, { store, path });
          if (users) {
            return users;
          } else {
            const users = await dbclient.user.findMany({
              where: { clientId },
            });
            await redis.json.set(store, "$", users);
            // await setCached(redis, { store, path }, users);
            return users;
          }
        } catch (err) {
          if (err instanceof TypeError) {
            throw new GraphQLError(err.message);
          }
          throw new GraphQLError(errors.CONNECTION_FAILED);
        }
      }
    ),
  },
  Mutation: {
    createUser: combineResolvers(
      isAdmin,
      async (
        parent: any,
        args: MutationCreateUserArgs,
        context: ServerContext
      ) => {
        const { dbclient } = context;
        const { input } = args;
        const {
          email,
          password,
          passwordConfirmation,
          firstName,
          lastName,
          roleId,
          clientId,
        } = input;
        if (password !== passwordConfirmation)
          throw new GraphQLError(errors.PASSWORD_MISMATCH);
        const hashedPassword = await generateHash(password);
        try {
          return await dbclient.user.create({
            data: {
              email,
              password: hashedPassword,
              firstName,
              lastName,
              roleId,
              clientId,
            },
          });
        } catch (err) {
          console.log("err", err);
          throw new GraphQLError(errors.CONNECTION_FAILED);
        }
      }
    ),
    signIn: async (
      parent: any,
      { input }: MutationSignInArgs,
      context: ServerContext
    ) => {
      const { dbclient } = context;
      const { email, password } = input;
      try {
        const user = await dbclient.user.findUnique({ where: { email } });
        if (!user) throw new GraphQLError(errors.USER_NOT_FOUND);
        const { password: hashedPassword } = user;
        const passwordMatch = await validateHash(password, hashedPassword);
        if (!passwordMatch)
          throw new GraphQLError(errors.USER_COULD_NOT_BE_AUTHENTICATED);
        return { token: await createJwtToken(user), expires: TOKEN_AGE };
      } catch (err) {
        throw new GraphQLError(errors.USER_NOT_FOUND);
      }
    },
    activateUser: combineResolvers(
      isAdmin,
      async (
        parent: any,
        args: MutationActivateUserArgs,
        context: ServerContext
      ) => {
        const { dbclient, me, redis } = context;
        const { id } = args;
        try {
          const user = await dbclient.user.update({
            where: { id },
            data: { active: true },
          });
          return user;
        } catch (err) {
          throw new GraphQLError(errors.CONNECTION_FAILED);
        }
      }
    ),
    confirmUser: combineResolvers(
      isAdmin,
      async (
        parent: any,
        args: MutationConfirmUserArgs,
        context: ServerContext
      ) => {
        const { dbclient, me, redis } = context;
        const { id } = args;
        try {
          const user = await dbclient.user.update({
            where: { id },
            data: { confirmed: true },
          });
          return user;
        } catch (err) {
          throw new GraphQLError(errors.CONNECTION_FAILED);
        }
      }
    ),
    changeRole: combineResolvers(
      isAdmin,
      async (
        parent: any,
        args: MutationChangeRoleArgs,
        context: ServerContext
      ) => {
        const { dbclient, me, redis } = context;
        const { id, roleId } = args;
        try {
          const user = await dbclient.user.update({
            where: { id },
            data: { roleId },
          });
        } catch (err) {
          throw new GraphQLError(errors.COULD_NOT_CHANGE_ROLE);
        }
      }
    ),
  },
  User: {
    role: combineResolvers(
      isAuthenticated,
      async (parent: User, args: any, context: ServerContext) => {
        const { dbclient, redis, me } = context;
        const { roleId } = parent;
        try {
          const db_role = await dbclient.role.findUnique({
            where: { id: roleId },
          });
          if (!db_role) throw new GraphQLError(errors.ROLE_NOT_FOUND);
          return db_role;
        } catch (err) {
          throw new GraphQLError(errors.ROLE_NOT_FOUND);
        }
      }
    ),
    client: async (parent: User, args: any, context: ServerContext) => {
      const { dbclient, me, redis } = context;
      const { clientId } = parent;
      try {
        const _client = await dbclient.client.findUnique({
          where: { id: clientId },
        });
        if (!_client) throw new GraphQLError(errors.CLIENT_NOT_FOUND);

        return _client;
      } catch (err) {
        throw new GraphQLError(errors.CLIENT_NOT_FOUND);
      }
    },
  },
};
