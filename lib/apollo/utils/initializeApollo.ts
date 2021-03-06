import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { createApolloClient } from "./createApolloClient";

let apolloClient: ApolloClient<NormalizedCacheObject>;

type InitialState = NormalizedCacheObject | undefined;

export const initializeApollo = (initialState?: InitialState) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });
    _apolloClient.cache.restore(data);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};
