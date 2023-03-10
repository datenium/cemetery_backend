import { combineResolvers, skip } from "graphql-resolvers";
import { GraphQLError } from "graphql";
import { errors } from "../../miscl";
import { ServerContext } from "../../utils/interfaces";
import { RoleNames } from "../../generated/graphql";

const isAuthenticated = async (
  parent: any,
  args: any,
  context: ServerContext
) => {
  const { me } = context;
  if (!me) {
    throw new GraphQLError(errors.USER_COULD_NOT_BE_AUTHENTICATED);
  }
  const { roleId, clientId, active } = me;
  if (!active) {
    throw new GraphQLError(errors.USER_NOT_YET_ACTIVE);
  }
  if (!roleId || !clientId) {
    throw new GraphQLError(errors.ACCESS_DENIED);
  }
  return skip;
};

const isSuperAdmin = combineResolvers(
  isAuthenticated,
  async (parent: any, args: any, context: ServerContext) => {
    const { me } = context;
    if (me?.role.name === RoleNames.SuperAdmin) {
      return skip;
    }
    throw new GraphQLError(errors.USER_NOT_SUPER_ADMIN);
  }
);

const isAdmin = combineResolvers(
  isAuthenticated,
  async (parent: any, args: any, context: ServerContext) => {
    const { me } = context;
    if (me?.role.name === (RoleNames.SuperAdmin || RoleNames.Admin)) {
      return skip;
    } else {
      throw new GraphQLError(errors.USER_NOT_ADMIN);
    }
  }
);

const isModerator = combineResolvers(
  isAuthenticated,
  async (parent: any, args: any, context: ServerContext) => {
    const { me } = context;
    if (me?.role.name === RoleNames.Moderator) {
      return skip;
    } else {
      throw new GraphQLError(errors.USER_NOT_MODERATOR);
    }
  }
);

const isEditor = combineResolvers(
  isAuthenticated,
  async (parent: any, args: any, context: ServerContext) => {
    const { me } = context;
    if (me?.role.name === RoleNames.Editor) {
      return skip;
    } else {
      throw new GraphQLError(errors.USER_NOT_EDITOR);
    }
  }
);

export { isAuthenticated, isSuperAdmin, isAdmin, isModerator, isEditor };
