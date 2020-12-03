import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $confirmPassword: String!) {
    signup(email: $email, password: $password, confirmPassword: $confirmPassword) {
      token
      user {
        email
      }
    }
  }
`;

export default SIGNUP;
