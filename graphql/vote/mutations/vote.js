import { gql } from "@apollo/client";

const VOTE = gql`
  mutation Vote($definition: ID!, $action: Int!) {
    vote(definition: $definition, action: $action) {
      definition {
        id
        score
      }
      action
    }
  }
`;

export default VOTE;
