import { gql } from "@apollo/client";

const ME = gql`
  query GetMe {
    me {
      email
      name
    }
  }
`;
export default ME;
