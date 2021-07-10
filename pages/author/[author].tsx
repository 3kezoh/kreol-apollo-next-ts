import { Definition, Layout, LoadingDefinition, Pagination } from "@components";
import { useDefinitions, usePages, useQuery } from "@hooks";
import Head from "next/head";

const Author = () => {
  const { author, id, page } = useQuery();
  const pages = usePages({ author: id });
  const definitions = useDefinitions({ author: id, page });

  return (
    <>
      <Head>
        <title>Author</title>
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
          <Pagination
            page={page}
            pages={pages}
            pathname={`/author/${author}`}
            query={{ page, id }}
          />
        )}
      </Layout>
    </>
  );
};

export default Author;
