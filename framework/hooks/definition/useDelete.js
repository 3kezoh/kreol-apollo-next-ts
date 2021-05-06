import { useMutation } from "@apollo/client";
import { DELETE_DEFINITION } from "@graphql/definition/mutations";
import { GET_DEFINITIONS } from "@graphql/definition/queries";

const useDelete = ({ author, page } = {}) => {
  const query = GET_DEFINITIONS;
  const [mutate] = useMutation(DELETE_DEFINITION, {
    refetchQueries: [{ query, variables: { author, page } }],
  });
  const onDelete = (id) =>
    mutate({
      variables: { id },
      update: (cache) => {
        cache.evict({ id: `Definition:${id}` });
        cache.gc();
      },
    });
  return onDelete;
};

export default useDelete;
