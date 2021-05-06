import { useQuery } from "@apollo/client";
import { GET_DEFINITIONS } from "@graphql/definition/queries";

const DEFINITIONS_PER_PAGES = 5;

const useDefinitions = ({ page, author, word } = {}) => {
  const { data, client } = useQuery(GET_DEFINITIONS, {
    variables: {
      page,
      author,
      limit: DEFINITIONS_PER_PAGES,
      word,
    },
    fetchPolicy: "cache-and-network",
  });

  const { definitions } = data ?? [];

  const prefetchDefinitions = ({ author, word } = {}) => ({ page }) =>
    client.query({
      query: GET_DEFINITIONS,
      variables: {
        page,
        author,
        limit: DEFINITIONS_PER_PAGES,
        word,
      },
    });

  return { definitions, prefetchDefinitions };
};

export default useDefinitions;
