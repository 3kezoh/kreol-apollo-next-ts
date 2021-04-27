import { gql } from "@apollo/client";

const VOTE = gql`
  mutation VoteMutation($definition: ID!, $action: Int!) {
    vote(definition: $definition, action: $action) {
      definition {
        score
      }
      action
    }
  }
`;

export default VOTE;
