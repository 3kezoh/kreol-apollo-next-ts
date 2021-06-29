import {
  DefinitionFieldsFragment,
  DefinitionsQueryVariables,
  Maybe,
  useDefinitionsQuery,
} from "generated/graphql";
import { useState } from "react";

type definitions = Array<Maybe<{ __typename?: "Definition" } & DefinitionFieldsFragment>>;

export const useDefinitions = (variables?: DefinitionsQueryVariables) => {
  const [definitions, setDefinitions] = useState<definitions>([]);
  useDefinitionsQuery({
    variables,
    fetchPolicy: "cache-and-network",
    onCompleted: ({ definitions }) => {
      if (definitions) setDefinitions(definitions);
    },
  });
  return definitions;
};
