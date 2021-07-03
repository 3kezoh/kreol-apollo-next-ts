import * as Types from "./graphql";

import * as Operations from "./graphql";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { QueryHookOptions, useQuery } from "@apollo/client";
import * as Apollo from "@apollo/client";
import type React from "react";
import type { NormalizedCacheObject } from "@apollo/client";
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
export const withPageMe = (
  optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>
) => (WrappedComponent: PageMeComp): NextPage => (props) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.MeDocument, options);
  return <WrappedComponent {...props} data={data} error={error} />;
};
export const ssrMe = {
  getServerPage: getServerPageMe,
  withPage: withPageMe,
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
export const withPageVerify = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.VerifyQuery, Types.VerifyQueryVariables>
) => (WrappedComponent: PageVerifyComp): NextPage => (props) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.VerifyDocument, options);
  return <WrappedComponent {...props} data={data} error={error} />;
};
export const ssrVerify = {
  getServerPage: getServerPageVerify,
  withPage: withPageVerify,
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
export const withPageCount = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.CountQuery, Types.CountQueryVariables>
) => (WrappedComponent: PageCountComp): NextPage => (props) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.CountDocument, options);
  return <WrappedComponent {...props} data={data} error={error} />;
};
export const ssrCount = {
  getServerPage: getServerPageCount,
  withPage: withPageCount,
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
export const withPageDefinitions = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.DefinitionsQuery, Types.DefinitionsQueryVariables>
) => (WrappedComponent: PageDefinitionsComp): NextPage => (props) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.DefinitionsDocument, options);
  return <WrappedComponent {...props} data={data} error={error} />;
};
export const ssrDefinitions = {
  getServerPage: getServerPageDefinitions,
  withPage: withPageDefinitions,
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
export type PagePopularComp = React.FC<{ data?: Types.PopularQuery; error?: Apollo.ApolloError }>;
export const withPagePopular = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.PopularQuery, Types.PopularQueryVariables>
) => (WrappedComponent: PagePopularComp): NextPage => (props) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.PopularDocument, options);
  return <WrappedComponent {...props} data={data} error={error} />;
};
export const ssrPopular = {
  getServerPage: getServerPagePopular,
  withPage: withPagePopular,
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
export const withPageSearch = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.SearchQuery, Types.SearchQueryVariables>
) => (WrappedComponent: PageSearchComp): NextPage => (props) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.SearchDocument, options);
  return <WrappedComponent {...props} data={data} error={error} />;
};
export const ssrSearch = {
  getServerPage: getServerPageSearch,
  withPage: withPageSearch,
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
export const withPageDefinition = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.DefinitionSubscription, Types.DefinitionSubscriptionVariables>
) => (WrappedComponent: PageDefinitionComp): NextPage => (props) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.DefinitionDocument, options);
  return <WrappedComponent {...props} data={data} error={error} />;
};
export const ssrDefinition = {
  getServerPage: getServerPageDefinition,
  withPage: withPageDefinition,
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
export const withPageReported = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.ReportedQuery, Types.ReportedQueryVariables>
) => (WrappedComponent: PageReportedComp): NextPage => (props) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  const { data, error } = useQuery(Operations.ReportedDocument, options);
  return <WrappedComponent {...props} data={data} error={error} />;
};
export const ssrReported = {
  getServerPage: getServerPageReported,
  withPage: withPageReported,
};
