import { gql } from "@apollo/client";

const DEFINITIONS = gql`
  query Definitions($author: ID, $page: Int) {
    definitions(author: $author, page: $page) {
      id
      word
      meaning
      example
      author {
        id
        email
      }
    }
  }
`;

export default DEFINITIONS;
