import { gql } from "@apollo/client";

const VERIFY = gql`
  query Verify($token: String!) {
    verify(token: $token)
  }
`;

export default VERIFY;
