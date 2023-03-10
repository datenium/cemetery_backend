import gql from "graphql-tag";

export default gql`
  extend type Query {
    address(id: ID!): Address!
    addresses: [Address!]!
  }
  extend type Mutation {
    createAddress(input: AddressInput!): Address!
    updateAddress(id: ID!, input: AddressInput!): Address!
  }
  input AddressInput {
    street: String!
    house_number: String!
    city: String!
    zip_code: String!
    country: String!
  }
  type Address {
    id: ID!
    street: String!
    house_number: String!
    city: String!
    zip_code: String!
    country: String!
    createdAt: Date
    updatedAt: Date
  }
`;
