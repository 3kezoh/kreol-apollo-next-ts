import { CountQueryVariables, useCountLazyQuery } from "generated/graphql";
import { useState } from "react";
import { useDeepCompareEffect } from "react-use";

const DEFINITIONS_PER_PAGES = 5;

export const usePages = (variables?: CountQueryVariables) => {
  const [pages, setPages] = useState(0);

  const [loadCount] = useCountLazyQuery({
    fetchPolicy: "cache-and-network",
    variables,
    onCompleted: ({ count }) => setPages(Math.ceil(count / DEFINITIONS_PER_PAGES)),
  });

  useDeepCompareEffect(() => {
    if (variables) {
      if (Object.values(variables).every((value) => value !== undefined)) loadCount();
    } else {
      loadCount();
    }
  }, [variables]);

  return pages;
};
