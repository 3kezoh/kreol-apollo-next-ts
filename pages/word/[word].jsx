import Head from "next/head";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Navbar, Layout, Pagination, Sidebar } from "@components";
import { getAllDefinitions, getCount } from "@framework/definition";
import { initializeApollo, addApolloState } from "@lib/apollo";

const DEFINITIONS_PER_PAGES = 5;

const getServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo();
  const { word, page = 1 } = query;
  const limit = DEFINITIONS_PER_PAGES;
  const definitions = await getAllDefinitions(apolloClient, { word, page, limit });
  const count = await getCount(apolloClient, { word });
  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);
  return addApolloState(apolloClient, { props: { definitions, page, pages, word } });
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
            {definitions && definitions.map((data) => <Definition key={data.id} data={data} />)}
            {definitions && pages > 1 && (
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
