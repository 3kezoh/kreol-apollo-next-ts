import { useMemo } from "react";
import { initializeApollo } from "@lib/apollo/utils";
import { APOLLO_STATE_PROP_NAME } from "@lib/apollo/config";

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const apolloClient = useMemo(() => initializeApollo(state), [state]);
  return apolloClient;
};
