import { combineResolvers } from "graphql-resolvers";
import { errors } from "../../miscl";
import { GraphQLError } from "graphql";
import {
  MutationCreateAddressArgs,
  Address,
  QueryAddressArgs,
} from "../../generated/graphql";
import { ServerContext } from "../../utils/interfaces";
import { isAuthenticated } from "./authorization";

export default {
  Query: {
    address: async (
      parent: Address,
      args: QueryAddressArgs,
      context: ServerContext
    ) => {
      const { dbclient, me, redis } = context;
      const { id } = args;
      try {
        const address = await dbclient.address.findUnique({ where: { id } });
        return address;
      } catch (err) {
        throw new GraphQLError(errors.ROLE_NOT_FOUND);
      }
    },
    addresses: async (parent: Address, args: any, context: ServerContext) => {
      const { dbclient, me, redis } = context;
      try {
        const _addresses = await dbclient.address.findMany();
        return _addresses;
      } catch (err) {
        throw new GraphQLError(errors.ROLE_NOT_FOUND);
      }
    },
  },
  Mutation: {
    createAddress: combineResolvers(
      isAuthenticated,
      async (
        parent: Address,
        { input }: MutationCreateAddressArgs,
        context: ServerContext
      ) => {
        const { dbclient, me, redis } = context;
        try {
          const address = await dbclient.address.create({
            data: { ...input },
          });
          return address;
        } catch (err) {
          throw new GraphQLError(errors.COULD_NOT_CREATE_ROLE);
        }
      }
    ),
  },
};
