const { gql } = require("@apollo/client");

const ME = gql`
  query {
    me {
      email
    }
  }
`;
export default ME;
