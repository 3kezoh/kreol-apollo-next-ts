import { useRouter } from "next/router";

const useQuery = () => {
  const { query } = useRouter();
  const { author, id, page, word } = query;
  return { author, id, page: parseInt(page || 1, 10), word };
};

export default useQuery;
