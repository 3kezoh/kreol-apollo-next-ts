import Head from "next/head";
import { Definition, Layout, Pagination } from "@components";
import { useDefinitions, useQuery, usePages } from "@framework/hooks/definition";

const Author = () => {
  const { author, id, page } = useQuery();
  const pages = usePages({ author: id });
  const { definitions } = useDefinitions({ page, author: id });
  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <Layout>
        {definitions && definitions.map((data) => <Definition key={data.id} data={data} />)}
        {definitions && (
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
