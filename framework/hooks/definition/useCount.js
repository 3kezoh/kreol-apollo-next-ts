import { useQuery } from "@apollo/client";
import { GET_COUNT } from "@graphql/definition/queries";

const useCount = ({ author, word } = {}) => {
  const variables = { author, word };
  const { data } = useQuery(GET_COUNT, { variables, fetchPolicy: "cache-and-network" });
  const { count } = data ?? 0;
  return count;
};

export default useCount;
