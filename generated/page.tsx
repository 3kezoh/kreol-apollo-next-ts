import type { NormalizedCacheObject } from "@apollo/client";
import * as Apollo from "@apollo/client";
import type React from "react";
import * as Operations from "./graphql";
import * as Types from "./graphql";
import { PopularQuery } from "./graphql";

export async function getServerPageMe(
  options: Omit<Apollo.QueryOptions<Types.MeQueryVariables>, "query">,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.MeQuery>({
    ...options,
    query: Operations.MeDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export type PageMeComp = React.FC<{ data?: Types.MeQuery; error?: Apollo.ApolloError }>;
export const ssrMe = {
  getServerPage: getServerPageMe,
};
export async function getServerPageVerify(
  options: Omit<Apollo.QueryOptions<Types.VerifyQueryVariables>, "query">,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.VerifyQuery>({
    ...options,
    query: Operations.VerifyDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export type PageVerifyComp = React.FC<{ data?: Types.VerifyQuery; error?: Apollo.ApolloError }>;
export const ssrVerify = {
  getServerPage: getServerPageVerify,
};

export async function getServerPageCount(
  options: Omit<Apollo.QueryOptions<Types.CountQueryVariables>, "query">,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.CountQuery>({
    ...options,
    query: Operations.CountDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export type PageCountComp = React.FC<{ data?: Types.CountQuery; error?: Apollo.ApolloError }>;
export const ssrCount = {
  getServerPage: getServerPageCount,
};
export async function getServerPageDefinitions(
  options: Omit<Apollo.QueryOptions<Types.DefinitionsQueryVariables>, "query">,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.DefinitionsQuery>({
    ...options,
    query: Operations.DefinitionsDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export type PageDefinitionsComp = React.FC<{
  data?: Types.DefinitionsQuery;
  error?: Apollo.ApolloError;
}>;
export const ssrDefinitions = {
  getServerPage: getServerPageDefinitions,
};
export async function getServerPagePopular(
  options: Omit<Apollo.QueryOptions<Types.PopularQueryVariables>, "query">,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.PopularQuery>({
    ...options,
    query: Operations.PopularDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export type PagePopularComp = React.FC<{ data?: PopularQuery; error?: Apollo.ApolloError }>;
export const ssrPopular = {
  getServerPage: getServerPagePopular,
};
export async function getServerPageSearch(
  options: Omit<Apollo.QueryOptions<Types.SearchQueryVariables>, "query">,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.SearchQuery>({
    ...options,
    query: Operations.SearchDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export type PageSearchComp = React.FC<{ data?: Types.SearchQuery; error?: Apollo.ApolloError }>;
export const ssrSearch = {
  getServerPage: getServerPageSearch,
};
export async function getServerPageDefinition(
  options: Omit<Apollo.QueryOptions<Types.DefinitionSubscriptionVariables>, "query">,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.DefinitionSubscription>({
    ...options,
    query: Operations.DefinitionDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export type PageDefinitionComp = React.FC<{
  data?: Types.DefinitionSubscription;
  error?: Apollo.ApolloError;
}>;
export const ssrDefinition = {
  getServerPage: getServerPageDefinition,
};

export async function getServerPageReported(
  options: Omit<Apollo.QueryOptions<Types.ReportedQueryVariables>, "query">,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.ReportedQuery>({
    ...options,
    query: Operations.ReportedDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export type PageReportedComp = React.FC<{ data?: Types.ReportedQuery; error?: Apollo.ApolloError }>;
export const ssrReported = {
  getServerPage: getServerPageReported,
};
