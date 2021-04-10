const { gql } = require("@apollo/client");

const ME = gql`
  query {
    me {
      email
      name
    }
  }
`;
export default ME;
