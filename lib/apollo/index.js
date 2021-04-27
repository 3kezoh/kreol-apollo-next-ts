import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient;

const ssrMode = typeof window === "undefined";
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
const cache = new InMemoryCache();
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const link = authLink.concat(httpLink);

const createApolloClient = () => new ApolloClient({ ssrMode, link, cache });

const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

const useApollo = (initialState) => useMemo(() => initializeApollo(initialState), [initialState]);

export { initializeApollo, useApollo };
