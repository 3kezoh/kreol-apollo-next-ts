import { GraphQLError } from "graphql";

export const getValidationErrors = (graphQLErrors: readonly GraphQLError[]) => {
  let validationErrors: { [i: string]: string } = {};
  graphQLErrors.forEach(({ extensions }) => {
    if (extensions?.validationErrors) {
      validationErrors = { ...validationErrors, ...extensions.validationErrors };
    }
  });
  return validationErrors;
};
