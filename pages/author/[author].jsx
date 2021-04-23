import Head from "next/head";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Layout, Navbar, Pagination, Sidebar } from "@components";
import { fetch } from "@lib/api";
import { withApollo } from "../../apollo";

const DEFINITIONS_PER_PAGES = 5;

const GET_DEFINITIONS_BY_AUTHOR = gql`
  query Definitions($author: ID!, $page: Int) {
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
  const { id: author } = query;
  let { page = 1 } = query;
  page = parseInt(page, 10);
  const {
    data: { definitions },
  } = await fetch({
    query: GET_DEFINITIONS_BY_AUTHOR,
    variables: { author, page, limit: DEFINITIONS_PER_PAGES },
  });
  const {
    data: { count },
  } = await fetch({ query: GET_COUNT_BY_AUTHOR, variables: { author } });
  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);
  return { props: { definitions, author, page, pages } };
};

const Author = ({ definitions, page, pages }) => {
  const router = useRouter();
  const { author, id } = router.query;
  return (
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
              {definitions.map((data) => (
                <Definition key={data.id} data={data} />
              ))}
              <Pagination
                page={page}
                pages={pages}
                pathname={`/author/${author}`}
                query={{ page, id }}
              />
            </Section>
          </Column>
        </Columns>
      </Layout>
    </>
  );
};

export default withApollo(Author);
export { getServerSideProps };
