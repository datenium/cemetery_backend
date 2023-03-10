import gql from "graphql-tag";

export default gql`
  extend type Query {
    me: User
    user(id: ID!): User!
    users: [User!]!
  }
  extend type Mutation {
    createUser(input: createUserInput!): User!
    signIn(input: SignInInput!): Token!
    activateUser(id: ID!): User!
    confirmUser(id: ID!): User!
    changeRole(id: ID!, roleId: ID!): User!
  }
  type Token {
    token: String!
    expires: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  input createUserInput {
    email: String!
    password: String!
    passwordConfirmation: String!
    firstName: String!
    lastName: String!
    roleId: ID!
    clientId: ID!
  }
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    active: Boolean!
    confirmed: Boolean!
    roleId: ID!
    role: Role!
    clientId: ID!
    client: Client!
    createdAt: Date!
    updatedAt: Date!
  }
`;
