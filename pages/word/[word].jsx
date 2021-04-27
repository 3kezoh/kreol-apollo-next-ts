import Head from "next/head";
import { gql } from "@apollo/client";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Navbar, Layout, Pagination, Sidebar } from "@components";
import { fetch } from "@lib/api";

const DEFINITIONS_PER_PAGES = 5;

const GET_DEFINITIONS_PER_WORD = gql`
  query Definitions($word: String!, $page: Int, $limit: Int) {
    definitions(filter: { word: $word }, page: $page, limit: $limit) {
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
`;

const GET_COUNT_PER_WORD = gql`
  query Count($word: String!) {
    count(filter: { word: $word })
  }
`;

const getServerSideProps = async ({ query }) => {
  const { word } = query;
  let { page = 1 } = query;
  page = parseInt(page, 10);
  const {
    data: { definitions },
  } = await fetch({
    query: GET_DEFINITIONS_PER_WORD,
    variables: { word, page, limit: DEFINITIONS_PER_PAGES },
  });
  const {
    data: { count },
  } = await fetch({ query: GET_COUNT_PER_WORD, variables: { word } });
  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);
  return { props: { definitions, page, pages, word } };
};

const Word = ({ definitions, page, pages, word }) => (
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
            {definitions.map((data) => (
              <Definition key={data.id} data={data} />
            ))}
            {pages > 1 && (
              <Pagination page={page} pages={pages} pathname={`/word/${word}`} query={{ page }} />
            )}
          </Section>
        </Column>
      </Columns>
    </Layout>
  </>
);

export default Word;
export { getServerSideProps };
