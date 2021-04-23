import Head from "next/head";
import { gql } from "@apollo/client";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Layout, Navbar, Sidebar, Pagination } from "@components";
import { fetch } from "@lib/api";
import { withApollo } from "../../apollo";

const DEFINITIONS_PER_PAGES = 50;

const GET_DEFINITIONS_BY_LETTER = gql`
  query Definitions($letter: String!, $page: Int, $limit: Int) {
    definitions(filter: { letter: $letter }, page: $page, limit: $limit) {
      id
      word
      meaning
      example
      score
      language
      author {
        id
        name
      }
      createdAt
    }
  }
`;

const GET_COUNT_BY_LETTER = gql`
  query Count($letter: String!) {
    count(filter: { letter: $letter })
  }
`;

const getServerSideProps = async ({ query }) => {
  const { letter } = query;
  let { page = 1 } = query;
  page = parseInt(page, 10);
  const {
    data: { definitions },
  } = await fetch({
    query: GET_DEFINITIONS_BY_LETTER,
    variables: { letter, page, limit: DEFINITIONS_PER_PAGES },
  });
  const {
    data: { count },
  } = await fetch({ query: GET_COUNT_BY_LETTER, variables: { letter } });
  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);
  return { props: { definitions, letter, page, pages } };
};

const Popular = ({ definitions, letter, page, pages }) => (
  <>
    <Head>
      <title>Popular</title>
    </Head>
    <Navbar />
    <Layout>
      <Columns>
        <Column isOneFifth isHiddenMobile>
          <Sidebar />
        </Column>
        <Column>
          <Section>
            {definitions.map((definition) => (
              <Definition key={definition.id} data={definition} />
            ))}
            {pages > 1 && <Pagination page={page} pages={pages} pathname={`/popular/${letter}`} />}
          </Section>
        </Column>
      </Columns>
    </Layout>
  </>
);

export default withApollo(Popular);
export { getServerSideProps };
