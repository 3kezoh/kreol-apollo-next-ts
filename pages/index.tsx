import { Definition, Layout, LoadingDefinition, Pagination } from "@components";
import { useQuery } from "@hooks";
import { initializeApollo } from "@lib/apollo/utils";
import { PageDefinitionsComp, ssrDefinitions } from "generated/page";
import { GetServerSideProps } from "next";
import Head from "next/head";

const DEFINITIONS_PER_PAGES = 5;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo();
  const page = parseInt(query.page as string);
  const variables = { page };
  return await ssrDefinitions.getServerPage({ variables }, apolloClient);
};

const Home: PageDefinitionsComp = ({ data, error }) => {
  const { page } = useQuery();

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (data && page) {
    const { definitions, count } = data;
    const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);

    return (
      <>
        <Head>
          <title>Kreol</title>
        </Head>
        <Layout>
          {definitions.length === 0 &&
            Array(5)
              .fill(null)
              .map((_, i) => <LoadingDefinition key={i} />)}
          {definitions.map(
            (definition) => definition && <Definition key={definition.id} data={definition} />
          )}
          {definitions && <Pagination page={page} pages={pages} pathname="/" query={{ page }} />}
        </Layout>
      </>
    );
  }

  return null;
};

export default Home;
