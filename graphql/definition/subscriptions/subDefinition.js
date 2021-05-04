import { gql } from "@apollo/client";

const SUB_DEFINITION = gql`
  subscription SubDefinition($ids: [ID!]!) {
    definition(ids: $ids) {
      id
      score
    }
  }
`;

export default SUB_DEFINITION;
