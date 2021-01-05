import { gql } from "@apollo/client";

const VOTE = gql`
  mutation Vote($definition: ID!, $action: Int!) {
    vote(definition: $definition, action: $action) {
      definition {
        score
      }
    }
  }
`;

export default VOTE;
