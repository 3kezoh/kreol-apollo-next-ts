import { gql } from "@apollo/client";

const DEFINITIONS = gql`
  query Definitions($author: ID, $word: String, $page: Int) {
    definitions(filter: { author: $author, word: $word }, page: $page) {
      id
      word
      meaning
      example
      score
      author {
        id
        email
        name
      }
      createdAt
    }
  }
`;

export default DEFINITIONS;
