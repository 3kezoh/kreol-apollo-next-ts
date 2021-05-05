import { gql } from "@apollo/client";

const DELETE_DEFINITION = gql`
  mutation DeleteDefinition($id: ID!) {
    deleteDefinition(id: $id) {
      id
    }
  }
`;

export default DELETE_DEFINITION;
