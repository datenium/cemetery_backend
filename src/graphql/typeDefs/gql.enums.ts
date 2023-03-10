import gql from "graphql-tag";

export default gql`
  enum SEX_TYPE {
    MALE
    FEMALE
    DIVERSE
  }

  enum BENEFICIARY_TYPE {
    PERSON
    INSTITUTION
  }
  enum CLIENT_TYPE {
    INDIVIDUAL
    COMPANY
    PUBLIC_INSTUTION
  }
  enum INVOICE_STATUS {
    PAID
    UNPAID
    PARTIALLY_PAID
  }
`;
