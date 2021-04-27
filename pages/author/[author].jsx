import Head from "next/head";
import { gql } from "@apollo/client";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Layout, Navbar, Pagination, Sidebar } from "@components";
import { apolloClient } from "@lib";

const DEFINITIONS_PER_PAGES = 5;

const GET_DEFINITIONS_BY_AUTHOR = gql`
  query GetDefinitionsByAuthor($author: ID!, $page: Int) {
    definitions(filter: { author: $author }, page: $page) {
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

const GET_COUNT_BY_AUTHOR = gql`
  query Count($author: ID!) {
    count(filter: { author: $author })
  }
`;

const getServerSideProps = async ({ query }) => {
  const { author, id } = query;
  let { page = 1 } = query;
  page = parseInt(page, 10);
  const {
    data: { definitions },
  } = await apolloClient.query({
    query: GET_DEFINITIONS_BY_AUTHOR,
    variables: { author: id, page, limit: DEFINITIONS_PER_PAGES },
  });
  const {
    data: { count },
  } = await apolloClient.query({ query: GET_COUNT_BY_AUTHOR, variables: { author: id } });
  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);
  return { props: { definitions, author, id, page, pages } };
};

const Author = ({ definitions, page, pages, author, id }) => (
  <>
    <Head>
      <title>User Profile</title>
    </Head>
    <Navbar />
    <Layout>
      <Columns>
        <Column isOneFifth isHiddenMobile>
          <Sidebar />
        </Column>
        <Column isTwoThirds="desktop" isFourFifths="tablet">
          <Section>
            {definitions && definitions.map((data) => <Definition key={data.id} data={data} />)}
            {pages > 1 && (
              <Pagination
                page={page}
                pages={pages}
                pathname={`/author/${author}`}
                query={{ page, id }}
              />
            )}
          </Section>
        </Column>
      </Columns>
    </Layout>
  </>
);

export default Author;
export { getServerSideProps };
