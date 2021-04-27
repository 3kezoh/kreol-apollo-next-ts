import { gql } from "@apollo/client";

const AUTHOR_FIELDS = gql`
  fragment AuthorFields on User {
    id
    name
    email
  }
`;

export default AUTHOR_FIELDS;
