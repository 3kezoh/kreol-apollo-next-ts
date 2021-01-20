import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $confirmPassword: String!, $name: String!) {
    signup(email: $email, password: $password, confirmPassword: $confirmPassword, name: $name) {
      token
      user {
        email
      }
    }
  }
`;

export default SIGNUP;
