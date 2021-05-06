import Head from "next/head";
import { Definition, Layout, Pagination } from "@components";
import { useDefinitions, useQuery, usePages } from "@framework/hooks/definition";

const Word = () => {
  const { word, page } = useQuery();
  const pages = usePages({ word });
  const { definitions } = useDefinitions({ page, word });
  return (
    <>
      <Head>
        <title>Kreol</title>
      </Head>
      <Layout>
        {definitions && definitions.map((data) => <Definition key={data.id} data={data} />)}
        {definitions && (
          <Pagination page={page} pages={pages} pathname={`/word/${word}`} query={{ page }} />
        )}
      </Layout>
    </>
  );
};

export default Word;
