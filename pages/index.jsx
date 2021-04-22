import { print } from "graphql";
import Head from "next/head";
import { gql } from "@apollo/client";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Layout, Navbar, Pagination, Sidebar } from "@components";
import { withApollo } from "../apollo";
import { fetch } from "../lib/api";

const GET_DEFINITIONS_BY_PAGE = print(gql`
  query Definitions($page: Int) {
    definitions(page: $page) {
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
    }
  }
`);

const GET_COUNT = print(gql`
  query {
    count
  }
`);

const getServerSideProps = async ({ query }) => {
  let { page = 1 } = query;
  page = parseInt(page, 10);
  const {
    data: { definitions },
  } = await fetch({ query: GET_DEFINITIONS_BY_PAGE, variables: { page } });
  const {
    data: { count },
  } = await fetch({ query: GET_COUNT });
  return { props: { definitions, count, page } };
};

const Home = ({ definitions, count, page }) => (
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
            {definitions.map((definition) => (
              <Definition key={definition.id} data={definition} />
            ))}
            <Pagination page={page} count={count} />
          </Section>
        </Column>
      </Columns>
    </Layout>
  </>
);

export default withApollo(Home);
export { getServerSideProps };
