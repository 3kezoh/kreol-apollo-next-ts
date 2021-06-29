import { CountQueryVariables, useCountQuery } from "generated/graphql";
import { useState } from "react";

const DEFINITIONS_PER_PAGES = 5;

export const usePages = (variables?: CountQueryVariables) => {
  const [pages, setPages] = useState(0);

  useCountQuery({
    fetchPolicy: "cache-and-network",
    variables,
    onCompleted: ({ count }) => setPages(Math.ceil(count / DEFINITIONS_PER_PAGES)),
  });

  return pages;
};
