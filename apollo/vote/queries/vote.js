import { gql } from "@apollo/client";

const VOTE = gql`
  query Vote($definition: ID!) {
    vote(definition: $definition) {
      action
    }
  }
`;

export default VOTE;
