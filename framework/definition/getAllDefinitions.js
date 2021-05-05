import { GET_DEFINITIONS } from "@graphql/definition/queries";

const getAllDefinitions = async (apolloClient, { author, word, page, limit, token } = {}) => {
  const { data } = await apolloClient.query({
    query: GET_DEFINITIONS,
    variables: { author, word, page: +page, limit },
    context: { headers: { Authorization: `Bearer ${token}` } },
    fetchPolicy: "network-only",
  });
  const { definitions } = data;
  return definitions;
};

export default getAllDefinitions;
