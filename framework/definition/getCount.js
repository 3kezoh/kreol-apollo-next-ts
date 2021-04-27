import { apolloClient } from "@lib";
import { GET_COUNT } from "@graphql/definition/queries";

const getAllDefinitions = async ({ variables } = {}) => {
  const { data } = await apolloClient.query({
    query: GET_COUNT,
    variables,
  });
  const { count } = data;
  return count;
};

export default getAllDefinitions;
