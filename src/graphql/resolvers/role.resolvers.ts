import { combineResolvers } from "graphql-resolvers";
import { errors } from "../../miscl";
import { GraphQLError } from "graphql";
import { MutationCreateRoleArgs, QueryRoleArgs } from "../../generated/graphql";
import { ServerContext } from "../../utils/interfaces";
import { isSuperAdmin } from "./authorization";

export default {
  Query: {
    role: async (parent: any, args: QueryRoleArgs, context: ServerContext) => {
      const { dbclient, me, redis } = context;
      const { id } = args;
      try {
        const _role = await dbclient.role.findUnique({ where: { id } });
        return _role;
      } catch (err) {
        throw new GraphQLError(errors.ROLE_NOT_FOUND);
      }
    },
    roles: async (parent: any, args: any, context: ServerContext) => {
      const { dbclient, me, redis } = context;
      try {
        const _roles = await dbclient.role.findMany();
        return _roles;
      } catch (err) {
        throw new GraphQLError(errors.ROLE_NOT_FOUND);
      }
    },
  },
  Mutation: {
    createRole: combineResolvers(
      isSuperAdmin,
      async (
        parent: any,
        { input }: MutationCreateRoleArgs,
        context: ServerContext
      ) => {
        const { dbclient, me, redis } = context;
        const { name } = input;
        try {
          const role = await dbclient.role.upsert({
            where: { name },
            update: {},
            create: { name },
          });
          return role;
        } catch (err) {
          throw new GraphQLError(errors.COULD_NOT_CREATE_ROLE);
        }
      }
    ),
  },
};
