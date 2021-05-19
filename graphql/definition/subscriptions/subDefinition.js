import { gql } from "@apollo/client";

const SUB_DEFINITION = gql`
  subscription SubDefinition($id: ID!) {
    definition(id: $id) {
      id
      score
    }
  }
`;

export default SUB_DEFINITION;
