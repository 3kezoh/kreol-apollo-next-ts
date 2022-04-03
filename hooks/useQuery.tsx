import { useRouter } from "next/router";

export const useQuery = () => {
  const { query } = useRouter();
  const { author, id, page, word } = query;

  return {
    author: author as string,
    id: id as string,
    page: parseInt(page as string, 10) || 1,
    word: word as string,
  };
};
