import Head from "next/head";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Layout, Navbar, Pagination, Sidebar } from "@components";
import { getAllDefinitions, getCount } from "@framework/definition";
import { addApolloState, initializeApollo } from "@lib/apollo/utils";

const DEFINITIONS_PER_PAGES = 5;

const getServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo();
  const { author, id, page = 1 } = query;
  const limit = DEFINITIONS_PER_PAGES;
  const definitions = await getAllDefinitions(apolloClient, { author: id, page, limit });
  const count = await getCount(apolloClient, { author: id });
  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);
  return addApolloState(apolloClient, { props: { definitions, author, id, page: +page, pages } });
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
            {definitions && pages > 1 && (
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
