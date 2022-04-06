import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  ObjectId: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type Definition = {
  __typename?: "Definition";
  id: Scalars["ID"];
  word: Scalars["String"];
  meaning: Scalars["String"];
  example?: Maybe<Scalars["String"]>;
  translation: Scalars["String"];
  author: User;
  score: Scalars["Int"];
  createdAt: Scalars["Date"];
  action?: Maybe<Scalars["Int"]>;
  reviewed: Scalars["Boolean"];
};

export type DefinitionSubscriptionPayload = {
  __typename?: "DefinitionSubscriptionPayload";
  id: Scalars["ID"];
  score: Scalars["Int"];
};

export type Filter = {
  author?: Maybe<Scalars["ID"]>;
  word?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createDefinition?: Maybe<Definition>;
  deleteDefinition?: Maybe<Definition>;
  review?: Maybe<Definition>;
  report?: Maybe<Report>;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  vote?: Maybe<Vote>;
};

export type MutationCreateDefinitionArgs = {
  word: Scalars["String"];
  meaning: Scalars["String"];
  example?: Maybe<Scalars["String"]>;
  translation: Scalars["String"];
};

export type MutationDeleteDefinitionArgs = {
  id: Scalars["ID"];
};

export type MutationReviewArgs = {
  id: Scalars["ID"];
};

export type MutationReportArgs = {
  definition: Scalars["ID"];
  reason: Scalars["Int"];
  message?: Maybe<Scalars["String"]>;
};

export type MutationCreateUserArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  id: Scalars["ID"];
  email: Scalars["String"];
  name: Scalars["String"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationVoteArgs = {
  definition: Scalars["ID"];
  action: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  verify: Scalars["Boolean"];
  definition?: Maybe<Definition>;
  definitions: Array<Maybe<Definition>>;
  count: Scalars["Int"];
  search: Array<Maybe<Definition>>;
  popular: Array<Maybe<Definition>>;
  report?: Maybe<Report>;
  reports?: Maybe<Array<Maybe<Report>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  vote?: Maybe<Vote>;
};

export type QueryDefinitionArgs = {
  id: Scalars["ID"];
};

export type QueryDefinitionsArgs = {
  filter?: Maybe<Filter>;
  page?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  sortBy?: Maybe<SortBy>;
};

export type QueryCountArgs = {
  filter?: Maybe<Filter>;
};

export type QuerySearchArgs = {
  match?: Maybe<Scalars["String"]>;
  page?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QueryPopularArgs = {
  letter?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QueryReportArgs = {
  definition: Scalars["ID"];
};

export type QueryReportsArgs = {
  definition: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryVoteArgs = {
  definition: Scalars["ID"];
};

export type Report = {
  __typename?: "Report";
  reporter: User;
  definition: Definition;
  reason: Scalars["Int"];
  message?: Maybe<Scalars["String"]>;
};

export enum Role {
  Admin = "ADMIN",
  User = "USER",
}

export type Subscription = {
  __typename?: "Subscription";
  definition: DefinitionSubscriptionPayload;
};

export type SubscriptionDefinitionArgs = {
  id: Scalars["ID"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  name: Scalars["String"];
};

export type Vote = {
  __typename?: "Vote";
  voter: User;
  definition: Definition;
  action: Scalars["Int"];
};

export type SortBy = {
  score?: Maybe<Scalars["Int"]>;
  createdAt?: Maybe<Scalars["Int"]>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { me?: Maybe<{ __typename?: "User"; id: string; name: string }> };

export type VerifyQueryVariables = Exact<{ [key: string]: never }>;

export type VerifyQuery = { verify: boolean };

export type AuthorFieldsFragment = { __typename?: "User" } & CoreAuthorFieldsFragment;

export type CoreAuthorFieldsFragment = { __typename?: "User"; id: string; name: string };

export type CoreDefinitionFieldsFragment = {
  __typename?: "Definition";
  id: string;
  word: string;
  meaning: string;
  example?: Maybe<string>;
};

export type DefinitionFieldsFragment = {
  __typename?: "Definition";
  author: { __typename?: "User" } & AuthorFieldsFragment;
} & CoreDefinitionFieldsFragment &
  MetaDefinitionFieldsFragment;

export type MetaDefinitionFieldsFragment = {
  __typename?: "Definition";
  action?: Maybe<number>;
  translation: string;
  score: number;
  createdAt: any;
};

export type CreateDefinitionMutationVariables = Exact<{
  word: Scalars["String"];
  meaning: Scalars["String"];
  example?: Maybe<Scalars["String"]>;
  translation: Scalars["String"];
}>;

export type CreateDefinitionMutation = {
  createDefinition?: Maybe<{ __typename?: "Definition"; id: string }>;
};

export type DeleteDefinitionMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteDefinitionMutation = {
  deleteDefinition?: Maybe<{ __typename?: "Definition"; id: string }>;
};

export type CountQueryVariables = Exact<{
  author?: Maybe<Scalars["ID"]>;
  word?: Maybe<Scalars["String"]>;
}>;

export type CountQuery = { count: number };

export type DefinitionsQueryVariables = Exact<{
  author?: Maybe<Scalars["ID"]>;
  word?: Maybe<Scalars["String"]>;
  page?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
}>;

export type DefinitionsQuery = {
  count: number;
  definitions: Array<Maybe<{ __typename?: "Definition" } & DefinitionFieldsFragment>>;
};

export type PopularQueryVariables = Exact<{
  letter?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
}>;

export type PopularQuery = {
  popular: Array<Maybe<{ __typename?: "Definition" } & CoreDefinitionFieldsFragment>>;
};

export type SearchQueryVariables = Exact<{
  match: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
}>;

export type SearchQuery = {
  search: Array<Maybe<{ __typename?: "Definition"; id: string; word: string; meaning: string }>>;
};

export type DefinitionSubscriptionVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DefinitionSubscription = {
  definition: { __typename?: "DefinitionSubscriptionPayload"; id: string; score: number };
};

export type ReportMutationVariables = Exact<{
  definition: Scalars["ID"];
  reason: Scalars["Int"];
  message?: Maybe<Scalars["String"]>;
}>;

export type ReportMutation = {
  report?: Maybe<{
    __typename?: "Report";
    reason: number;
    message?: Maybe<string>;
    definition: { __typename?: "Definition" } & DefinitionFieldsFragment;
  }>;
};

export type ReportedQueryVariables = Exact<{
  definition: Scalars["ID"];
}>;

export type ReportedQuery = {
  report?: Maybe<{
    __typename?: "Report";
    reason: number;
    message?: Maybe<string>;
    definition: { __typename?: "Definition" } & DefinitionFieldsFragment;
  }>;
};

export type VoteMutationVariables = Exact<{
  definition: Scalars["ID"];
  action: Scalars["Int"];
}>;

export type VoteMutation = {
  vote?: Maybe<{
    __typename?: "Vote";
    action: number;
    definition: { __typename?: "Definition"; id: string; score: number };
  }>;
};

export const CoreDefinitionFieldsFragmentDoc = gql`
  fragment CoreDefinitionFields on Definition {
    id
    word
    meaning
    example
  }
`;
export const MetaDefinitionFieldsFragmentDoc = gql`
  fragment MetaDefinitionFields on Definition {
    action
    translation
    score
    createdAt
  }
`;
export const CoreAuthorFieldsFragmentDoc = gql`
  fragment CoreAuthorFields on User {
    id
    name
  }
`;
export const AuthorFieldsFragmentDoc = gql`
  fragment AuthorFields on User {
    ...CoreAuthorFields
  }
  ${CoreAuthorFieldsFragmentDoc}
`;
export const DefinitionFieldsFragmentDoc = gql`
  fragment DefinitionFields on Definition {
    ...CoreDefinitionFields
    ...MetaDefinitionFields
    author {
      ...AuthorFields
    }
  }
  ${CoreDefinitionFieldsFragmentDoc}
  ${MetaDefinitionFieldsFragmentDoc}
  ${AuthorFieldsFragmentDoc}
`;
export const MeDocument = gql`
  query Me {
    me {
      id
      name
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const VerifyDocument = gql`
  query Verify {
    verify
  }
`;

/**
 * __useVerifyQuery__
 *
 * To run a query within a React component, call `useVerifyQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyQuery({
 *   variables: {
 *   },
 * });
 */
export function useVerifyQuery(
  baseOptions?: Apollo.QueryHookOptions<VerifyQuery, VerifyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VerifyQuery, VerifyQueryVariables>(VerifyDocument, options);
}
export function useVerifyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VerifyQuery, VerifyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VerifyQuery, VerifyQueryVariables>(VerifyDocument, options);
}
export type VerifyQueryHookResult = ReturnType<typeof useVerifyQuery>;
export type VerifyLazyQueryHookResult = ReturnType<typeof useVerifyLazyQuery>;
export type VerifyQueryResult = Apollo.QueryResult<VerifyQuery, VerifyQueryVariables>;
export const CreateDefinitionDocument = gql`
  mutation CreateDefinition(
    $word: String!
    $meaning: String!
    $example: String
    $translation: String!
  ) {
    createDefinition(word: $word, meaning: $meaning, example: $example, translation: $translation) {
      id
    }
  }
`;
export type CreateDefinitionMutationFn = Apollo.MutationFunction<
  CreateDefinitionMutation,
  CreateDefinitionMutationVariables
>;

/**
 * __useCreateDefinitionMutation__
 *
 * To run a mutation, you first call `useCreateDefinitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDefinitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDefinitionMutation, { data, loading, error }] = useCreateDefinitionMutation({
 *   variables: {
 *      word: // value for 'word'
 *      meaning: // value for 'meaning'
 *      example: // value for 'example'
 *      translation: // value for 'translation'
 *   },
 * });
 */
export function useCreateDefinitionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDefinitionMutation,
    CreateDefinitionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateDefinitionMutation, CreateDefinitionMutationVariables>(
    CreateDefinitionDocument,
    options
  );
}
export type CreateDefinitionMutationHookResult = ReturnType<typeof useCreateDefinitionMutation>;
export type CreateDefinitionMutationResult = Apollo.MutationResult<CreateDefinitionMutation>;
export type CreateDefinitionMutationOptions = Apollo.BaseMutationOptions<
  CreateDefinitionMutation,
  CreateDefinitionMutationVariables
>;
export const DeleteDefinitionDocument = gql`
  mutation DeleteDefinition($id: ID!) {
    deleteDefinition(id: $id) {
      id
    }
  }
`;
export type DeleteDefinitionMutationFn = Apollo.MutationFunction<
  DeleteDefinitionMutation,
  DeleteDefinitionMutationVariables
>;

/**
 * __useDeleteDefinitionMutation__
 *
 * To run a mutation, you first call `useDeleteDefinitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDefinitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDefinitionMutation, { data, loading, error }] = useDeleteDefinitionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDefinitionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteDefinitionMutation,
    DeleteDefinitionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteDefinitionMutation, DeleteDefinitionMutationVariables>(
    DeleteDefinitionDocument,
    options
  );
}
export type DeleteDefinitionMutationHookResult = ReturnType<typeof useDeleteDefinitionMutation>;
export type DeleteDefinitionMutationResult = Apollo.MutationResult<DeleteDefinitionMutation>;
export type DeleteDefinitionMutationOptions = Apollo.BaseMutationOptions<
  DeleteDefinitionMutation,
  DeleteDefinitionMutationVariables
>;
export const CountDocument = gql`
  query Count($author: ID, $word: String) {
    count(filter: { author: $author, word: $word })
  }
`;

/**
 * __useCountQuery__
 *
 * To run a query within a React component, call `useCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountQuery({
 *   variables: {
 *      author: // value for 'author'
 *      word: // value for 'word'
 *   },
 * });
 */
export function useCountQuery(
  baseOptions?: Apollo.QueryHookOptions<CountQuery, CountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountQuery, CountQueryVariables>(CountDocument, options);
}
export function useCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CountQuery, CountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CountQuery, CountQueryVariables>(CountDocument, options);
}
export type CountQueryHookResult = ReturnType<typeof useCountQuery>;
export type CountLazyQueryHookResult = ReturnType<typeof useCountLazyQuery>;
export type CountQueryResult = Apollo.QueryResult<CountQuery, CountQueryVariables>;
export const DefinitionsDocument = gql`
  query Definitions($author: ID, $word: String, $page: Int, $limit: Int) {
    definitions(filter: { author: $author, word: $word }, page: $page, limit: $limit) {
      ...DefinitionFields
    }
    count(filter: { author: $author, word: $word })
  }
  ${DefinitionFieldsFragmentDoc}
`;

/**
 * __useDefinitionsQuery__
 *
 * To run a query within a React component, call `useDefinitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefinitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefinitionsQuery({
 *   variables: {
 *      author: // value for 'author'
 *      word: // value for 'word'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useDefinitionsQuery(
  baseOptions?: Apollo.QueryHookOptions<DefinitionsQuery, DefinitionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DefinitionsQuery, DefinitionsQueryVariables>(DefinitionsDocument, options);
}
export function useDefinitionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DefinitionsQuery, DefinitionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DefinitionsQuery, DefinitionsQueryVariables>(
    DefinitionsDocument,
    options
  );
}
export type DefinitionsQueryHookResult = ReturnType<typeof useDefinitionsQuery>;
export type DefinitionsLazyQueryHookResult = ReturnType<typeof useDefinitionsLazyQuery>;
export type DefinitionsQueryResult = Apollo.QueryResult<
  DefinitionsQuery,
  DefinitionsQueryVariables
>;
export const PopularDocument = gql`
  query Popular($letter: String, $limit: Int) {
    popular(letter: $letter, limit: $limit) {
      ...CoreDefinitionFields
    }
  }
  ${CoreDefinitionFieldsFragmentDoc}
`;

/**
 * __usePopularQuery__
 *
 * To run a query within a React component, call `usePopularQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularQuery({
 *   variables: {
 *      letter: // value for 'letter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePopularQuery(
  baseOptions?: Apollo.QueryHookOptions<PopularQuery, PopularQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PopularQuery, PopularQueryVariables>(PopularDocument, options);
}
export function usePopularLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PopularQuery, PopularQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PopularQuery, PopularQueryVariables>(PopularDocument, options);
}
export type PopularQueryHookResult = ReturnType<typeof usePopularQuery>;
export type PopularLazyQueryHookResult = ReturnType<typeof usePopularLazyQuery>;
export type PopularQueryResult = Apollo.QueryResult<PopularQuery, PopularQueryVariables>;
export const SearchDocument = gql`
  query Search($match: String!, $page: Int) {
    search(match: $match, page: $page) {
      id
      word
      meaning
    }
  }
`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      match: // value for 'match'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSearchQuery(
  baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
}
export function useSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
}
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const DefinitionDocument = gql`
  subscription Definition($id: ID!) {
    definition(id: $id) {
      id
      score
    }
  }
`;

/**
 * __useDefinitionSubscription__
 *
 * To run a query within a React component, call `useDefinitionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDefinitionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefinitionSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDefinitionSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    DefinitionSubscription,
    DefinitionSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<DefinitionSubscription, DefinitionSubscriptionVariables>(
    DefinitionDocument,
    options
  );
}
export type DefinitionSubscriptionHookResult = ReturnType<typeof useDefinitionSubscription>;
export type DefinitionSubscriptionResult = Apollo.SubscriptionResult<DefinitionSubscription>;
export const ReportDocument = gql`
  mutation Report($definition: ID!, $reason: Int!, $message: String) {
    report(definition: $definition, reason: $reason, message: $message) {
      definition {
        ...DefinitionFields
      }
      reason
      message
    }
  }
  ${DefinitionFieldsFragmentDoc}
`;
export type ReportMutationFn = Apollo.MutationFunction<ReportMutation, ReportMutationVariables>;

/**
 * __useReportMutation__
 *
 * To run a mutation, you first call `useReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportMutation, { data, loading, error }] = useReportMutation({
 *   variables: {
 *      definition: // value for 'definition'
 *      reason: // value for 'reason'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useReportMutation(
  baseOptions?: Apollo.MutationHookOptions<ReportMutation, ReportMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReportMutation, ReportMutationVariables>(ReportDocument, options);
}
export type ReportMutationHookResult = ReturnType<typeof useReportMutation>;
export type ReportMutationResult = Apollo.MutationResult<ReportMutation>;
export type ReportMutationOptions = Apollo.BaseMutationOptions<
  ReportMutation,
  ReportMutationVariables
>;
export const ReportedDocument = gql`
  query Reported($definition: ID!) {
    report(definition: $definition) {
      definition {
        ...DefinitionFields
      }
      reason
      message
    }
  }
  ${DefinitionFieldsFragmentDoc}
`;

/**
 * __useReportedQuery__
 *
 * To run a query within a React component, call `useReportedQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportedQuery({
 *   variables: {
 *      definition: // value for 'definition'
 *   },
 * });
 */
export function useReportedQuery(
  baseOptions: Apollo.QueryHookOptions<ReportedQuery, ReportedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReportedQuery, ReportedQueryVariables>(ReportedDocument, options);
}
export function useReportedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReportedQuery, ReportedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReportedQuery, ReportedQueryVariables>(ReportedDocument, options);
}
export type ReportedQueryHookResult = ReturnType<typeof useReportedQuery>;
export type ReportedLazyQueryHookResult = ReturnType<typeof useReportedLazyQuery>;
export type ReportedQueryResult = Apollo.QueryResult<ReportedQuery, ReportedQueryVariables>;
export const VoteDocument = gql`
  mutation Vote($definition: ID!, $action: Int!) {
    vote(definition: $definition, action: $action) {
      definition {
        id
        score
      }
      action
    }
  }
`;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      definition: // value for 'definition'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
