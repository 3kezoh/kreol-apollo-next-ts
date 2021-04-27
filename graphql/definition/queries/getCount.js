import { gql } from "@apollo/client";

const GET_COUNT = gql`
  query GetCount($author: ID, $word: String, $letter: String) {
    count(filter: { author: $author, word: $word, letter: $letter })
  }
`;

export default GET_COUNT;
