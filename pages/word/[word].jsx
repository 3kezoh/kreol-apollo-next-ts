import Head from "next/head";
import { Columns, Column, Section } from "@Bulma";
import { Definition, Navbar, Layout, Pagination, Sidebar } from "@components";
import { getAllDefinitions, getCount } from "@framework/definition";

const DEFINITIONS_PER_PAGES = 5;

const getServerSideProps = async ({ query }) => {
  const { word, page = 1 } = query;
  const definitions = await getAllDefinitions({ word, page, limit: DEFINITIONS_PER_PAGES });
  const count = await getCount({ word });
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
