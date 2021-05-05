import { GET_POPULAR } from "@graphql/definition/queries";

const getPopular = async (apolloClient, { letter, limit } = {}) => {
  const { data } = await apolloClient.query({
    query: GET_POPULAR,
    variables: { letter, limit },
  });
  const { popular } = data;
  return popular;
};

export default getPopular;
