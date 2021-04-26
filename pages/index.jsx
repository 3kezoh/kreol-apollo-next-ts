import Head from "next/head";
import { gql } from "@apollo/client";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Layout, Navbar, Pagination, Sidebar } from "@components";
import { initializeApollo } from "@lib/apollo/client";
import withApollo from "next-with-apollo";

const DEFINITIONS_PER_PAGES = 5;

const GET_DEFINITIONS_BY_PAGE = gql`
  query Definitions($page: Int, $limit: Int) {
    definitions(page: $page, limit: $limit) {
      id
      word
      meaning
      example
      score
      language
      author {
        id
        email
        name
      }
      createdAt
      action
    }
  }
`;

const GET_COUNT = gql`
  query {
    count
  }
`;

const getServerSideProps = async ({ query, req }) => {
  const apolloClient = initializeApollo();
  const {
    cookies: { token },
  } = req;
  let { page = 1 } = query;
  page = parseInt(page, 10);

  const {
    data: { definitions },
  } = await apolloClient.query({
    query: GET_DEFINITIONS_BY_PAGE,
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

export default withApollo(Home);
export { getServerSideProps };
