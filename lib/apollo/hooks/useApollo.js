import { useMemo } from "react";
import { initializeApollo } from "@lib/apollo/utils";
import { APOLLO_STATE_PROP_NAME } from "@lib/apollo/config";

const useApollo = (pageProps) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};

export default useApollo;
