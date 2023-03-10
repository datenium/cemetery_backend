import gql from "graphql-tag";

export default gql`
  extend type Query {
    client(id: ID!): Client!
    clients: [Client!]!
  }
  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
  }
  input CreateClientInput {
    name: String!
    client_type: CLIENT_TYPE!
    description: String!
    address: AddressInput!
  }
  type Client {
    id: ID!
    name: String!
    client_type: CLIENT_TYPE!
    description: String!
    addressId: String!
    address: Address!
    createdAt: Date!
    updatedAt: Date!
  }
  enum CLIENT_TYPE {
    INDIVIDUAL
    COMPANY
    PUBLIC_INSTUTION
  }
`;
