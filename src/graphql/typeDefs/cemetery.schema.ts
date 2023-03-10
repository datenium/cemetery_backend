import gql from "graphql-tag";

export default gql`
  enum CEMETERY_TYPE {
    CATHOLIC
    PROTESTANT
    JEWISH
    MUSLIM
    MIXED
    OTHER
  }
`;
