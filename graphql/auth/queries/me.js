import { gql } from "@apollo/client";

const ME = gql`
  query GetMe {
    me {
      name
    }
  }
`;
export default ME;
