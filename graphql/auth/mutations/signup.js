import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(input: { email: $email, password: $password }) {
      token
      user {
        email
      }
    }
  }
`;

export default SIGNUP;
