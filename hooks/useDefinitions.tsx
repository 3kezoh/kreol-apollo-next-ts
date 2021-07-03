import {
  DefinitionsQuery,
  DefinitionsQueryVariables,
  useDefinitionsQuery,
} from "generated/graphql";
import { useState } from "react";

export const useDefinitions = (variables?: DefinitionsQueryVariables) => {
  const [definitions, setDefinitions] = useState<DefinitionsQuery["definitions"]>([]);
  useDefinitionsQuery({
    variables,
    fetchPolicy: "cache-and-network",
    onCompleted: ({ definitions }) => {
      if (definitions) setDefinitions(definitions);
    },
  });
  return definitions;
};
