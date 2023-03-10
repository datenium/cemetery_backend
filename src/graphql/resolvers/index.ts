import { GraphQLDateTime } from "graphql-scalars";
import { GraphQLUpload } from "graphql-upload-ts";
import userResolvers from "./user.resolvers";
import roleResolvers from "./role.resolvers";
import clientResolvers from "./client.resolvers";
import addressResolvers from "./address.resolvers";

const customScalarResolver = {
  Date: GraphQLDateTime,
  Upload: GraphQLUpload,
};

export default [
  customScalarResolver,
  userResolvers,
  roleResolvers,
  clientResolvers,
  addressResolvers
];
