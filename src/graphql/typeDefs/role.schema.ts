import gql from "graphql-tag";

export default gql`
  extend type Query {
    role(id: ID!): Role!
    roles: [Role!]!
  }
  extend type Mutation {
    createRole(input: CreateRoleInput!): Role!
  }

  enum RoleNames {
    SUPER_ADMIN
    ADMIN
    MODERATOR
    EDITOR
    USER
  }

  input CreateRoleInput {
    name: RoleNames!
  }
  type Role {
    id: ID!
    name: RoleNames!
    createdAt: Date!
    updatedAt: Date!
  }
`;
