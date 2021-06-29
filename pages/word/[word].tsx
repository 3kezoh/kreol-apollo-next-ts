import { Definition, Layout, LoadingDefinition, Pagination } from "@components";
import { useDefinitions, usePages, useQuery } from "@hooks";
import Head from "next/head";

const Word = () => {
  const { word, page } = useQuery();
  const pages = usePages({ word });
  const definitions = useDefinitions({ page, word });

  return (
    <>
      <Head>
        <title>Kreol</title>
      </Head>
      <Layout>
        {definitions.length === 0 &&
          Array(5)
            .fill(null)
            .map((_, i) => <LoadingDefinition key={i} />)}
        {definitions.map(
          (definition) => definition && <Definition key={definition.id} data={definition} />
        )}
        {definitions.length > 0 && (
          <Pagination page={page} pages={pages} pathname={`/word/${word}`} query={{ page }} />
        )}
      </Layout>
    </>
  );
};

export default Word;
