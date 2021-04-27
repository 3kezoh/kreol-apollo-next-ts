import Head from "next/head";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Layout, Navbar, Pagination, Sidebar } from "@components";
import { apolloClient } from "@lib";
import { GET_DEFINITIONS, GET_COUNT } from "@graphql/definition/queries";

const DEFINITIONS_PER_PAGES = 5;

const getServerSideProps = async ({ query, req }) => {
  const {
    cookies: { token },
  } = req;
  let { page = 1 } = query;
  page = parseInt(page, 10);

  const {
    data: { definitions },
  } = await apolloClient.query({
    query: GET_DEFINITIONS,
    variables: { page, limit: DEFINITIONS_PER_PAGES },
    context: { headers: { Authorization: `Bearer ${token}` } },
    fetchPolicy: "network-only",
  });

  const {
    data: { count },
  } = await apolloClient.query({ query: GET_COUNT });

  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);

  return { props: { definitions, page, pages } };
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
