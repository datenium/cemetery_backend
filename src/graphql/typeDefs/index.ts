import gql from "graphql-tag";
import enums from "./gql.enums";
import userSchema from "./user.schema";
import roleSchema from "./role.schema";
import clientSchema from "./client.schema";
import addressSchema from "./address.schema";
import cemeterySchema from "./cemetery.schema";

const linkSchema = gql`
  scalar Date
  scalar Upload
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  enums,
  userSchema,
  roleSchema,
  clientSchema,
  addressSchema,
  cemeterySchema,
];
