import { gql } from "@apollo/client";

const CORE_DEFINITION_FIELDS = gql`
  fragment CoreDefinitionFields on Definition {
    id
    word
    meaning
    example
  }
`;

export default CORE_DEFINITION_FIELDS;
