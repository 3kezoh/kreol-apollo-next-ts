import Head from "next/head";
import { Definition, Layout, LoadingDefinition, Pagination } from "@components";
import { useDefinitions, useQuery, usePages } from "@hooks";

const Author = () => {
  const { author, id, page } = useQuery();
  const pages = usePages({ author: id });
  const definitions = useDefinitions({ page, author: id });

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
