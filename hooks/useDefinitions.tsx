import {
  DefinitionsQuery,
  DefinitionsQueryVariables,
  useDefinitionsLazyQuery,
} from "generated/graphql";
import { Dispatch, SetStateAction, useState } from "react";
import { useDeepCompareEffect } from "react-use";

export const useDefinitions = (
  variables: DefinitionsQueryVariables
): [DefinitionsQuery["definitions"], Dispatch<SetStateAction<DefinitionsQuery["definitions"]>>] => {
  const [definitions, setDefinitions] = useState<DefinitionsQuery["definitions"]>([]);

  const [loadDefinitions] = useDefinitionsLazyQuery({
    variables,
    fetchPolicy: "cache-and-network",
    onCompleted: ({ definitions }) => {
      if (definitions) setDefinitions(definitions);
    },
  });

  useDeepCompareEffect(() => {
    if (Object.values(variables).every((value) => value !== undefined)) loadDefinitions();
  }, [loadDefinitions, variables]);

  return [definitions, setDefinitions];
};
