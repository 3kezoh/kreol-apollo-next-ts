import { gql } from "@apollo/client";

const DEFINITIONS = gql`
  query Definitions($author: ID, $word: String, $page: Int) {
    definitions(filter: { author: $author, word: $word }, page: $page) {
      id
      word
      meaning
      example
      author {
        id
        email
        name
      }
    }
  }
`;

export default DEFINITIONS;
