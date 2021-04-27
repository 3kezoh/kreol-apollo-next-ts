import { gql } from "@apollo/client";
import { DEFINITION_FIELDS } from "../fragments";

const GET_DEFINITIONS = gql`
  ${DEFINITION_FIELDS}
  query GetDefinitions($author: ID, $word: String, $page: Int, $limit: Int) {
    definitions(filter: { author: $author, word: $word }, page: $page, limit: $limit) {
      ...DefinitionFields
    }
  }
`;

export default GET_DEFINITIONS;
