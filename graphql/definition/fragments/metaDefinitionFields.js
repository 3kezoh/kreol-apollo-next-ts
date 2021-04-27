import { gql } from "@apollo/client";

const META_DEFINITION_FIELDS = gql`
  fragment CoreDefinitionFields on Definition {
    action
    language
    score
    createdAt
  }
`;

export default META_DEFINITION_FIELDS;
