import { GraphQLError } from "graphql";
import { Dispatch, SetStateAction } from "react";

type params = { graphQLErrors: readonly GraphQLError[]; setErrors: Dispatch<SetStateAction<{}>> };
type validationError = { field: string; message: string };

export const handleGraphQLError = ({ graphQLErrors, setErrors }: params) => {
  const errors: { [i: string]: string } = {};
  graphQLErrors.forEach(({ extensions }) => {
    if (extensions?.validationErrors) {
      extensions.validationErrors.forEach(({ field, message }: validationError) => {
        errors[field] = message;
      });
      return setErrors(errors);
    }
  });
};
