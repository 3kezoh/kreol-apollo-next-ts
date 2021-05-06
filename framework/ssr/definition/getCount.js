import { GET_COUNT } from "@graphql/definition/queries";

const getCount = async (apolloClient, { author, word, letter } = {}) => {
  const { data } = await apolloClient.query({
    query: GET_COUNT,
    variables: { author, word, letter },
  });
  const { count } = data;
  return count;
};

export default getCount;
