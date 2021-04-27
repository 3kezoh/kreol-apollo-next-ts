import { gql } from "@apollo/client";
import { AUTHOR_FIELDS } from "@graphql/author/fragments";

const DEFINITION_FIELDS = gql`
  ${AUTHOR_FIELDS}
  fragment DefinitionFields on Definition {
    id
    word
    meaning
    example
    language
    score
    action
    createdAt
    author {
      ...AuthorFields
    }
  }
`;

export default DEFINITION_FIELDS;
