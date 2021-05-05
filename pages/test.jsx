import { initializeApollo, addApolloState } from "@lib/ac";
import { getAllDefinitions } from "@framework/definition";

const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const definitions = await getAllDefinitions(apolloClient);

  return addApolloState(apolloClient, {
    props: {
      definitions,
    },
  });
};

const Test = ({ definitions }) => (
  <div className="test">{JSON.stringify(definitions, null, 2)}</div>
);

export default Test;
export { getServerSideProps };
