import Head from "next/head";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Layout, Navbar, Pagination, Sidebar } from "@components";
import { getAllDefinitions, getCount } from "@framework/definition";
import { initializeApollo, addApolloState } from "@lib/apollo";

const DEFINITIONS_PER_PAGES = 5;

const getServerSideProps = async ({ query, req }) => {
  const apolloClient = initializeApollo();
  const { cookies } = req;
  const { token } = cookies;
  const { page = 1 } = query;
  const definitions = await getAllDefinitions(apolloClient, { page, token });
  const count = await getCount(apolloClient);
  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);
  return addApolloState(apolloClient, { props: { definitions, page: +page, pages } });
};

const Home = ({ definitions, pages, page }) => (
  <>
    <Head>
      <title>Kreol</title>
    </Head>
    <Navbar />
    <Layout>
      <Columns>
        <Column isOneFifth isHiddenMobile>
          <Sidebar />
        </Column>
        <Column isTwoThirds="desktop" isFourFifths="tablet">
          <Section>
            {definitions &&
              definitions.map((definition) => <Definition key={definition.id} data={definition} />)}
            {definitions && pages > 1 && (
              <Pagination page={page} pages={pages} pathname="/" query={{ page }} />
            )}
          </Section>
        </Column>
      </Columns>
    </Layout>
  </>
);

export default Home;
export { getServerSideProps };
