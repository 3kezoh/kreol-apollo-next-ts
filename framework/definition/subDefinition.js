import { apolloClient } from "@lib";
import { SUB_DEFINITION } from "@graphql/definition/subscriptions";

const getAllDefinitions = async ({ author, word, letter } = {}) => {
  const { data } = await apolloClient.query({
    query: SUB_DEFINITION,
    variables: { author, word, letter },
  });
  const { count } = data;
  return count;
};

export default getAllDefinitions;
