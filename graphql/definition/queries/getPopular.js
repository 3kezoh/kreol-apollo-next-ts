import { gql } from "@apollo/client";
import { CORE_DEFINITION_FIELDS } from "../fragments";

const GET_POPULAR = gql`
  ${CORE_DEFINITION_FIELDS}
  query GetPopular($letter: String, $limit: Int) {
    popular(letter: $letter, limit: $limit) {
      ...CoreDefinitionFields
    }
  }
`;

export default GET_POPULAR;
