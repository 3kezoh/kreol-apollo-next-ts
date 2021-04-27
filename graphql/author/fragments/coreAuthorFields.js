import { gql } from "@apollo/client";

const CORE_AUTHOR_FIELDS = gql`
  fragment CoreAuthorFields on User {
    id
    name
  }
`;

export default CORE_AUTHOR_FIELDS;
