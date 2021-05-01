import { gql } from "@apollo/client";

const GET_COUNT = gql`
  query GetCount($author: ID, $word: String) {
    count(filter: { author: $author, word: $word })
  }
`;

export default GET_COUNT;
