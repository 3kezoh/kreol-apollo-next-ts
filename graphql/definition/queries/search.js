import { gql } from "@apollo/client";

const SEARCH = gql`
  query Search($match: String!, $page: Int) {
    search(match: $match, page: $page) {
      id
      word
      meaning
    }
  }
`;

export default SEARCH;
