import Head from "next/head";
import { Definition, Layout, LoadingDefinition, Pagination } from "@components";
import { useDefinitions, useQuery, usePages } from "@framework/hooks/definition";

const Home = () => {
  const { page } = useQuery();
  const pages = usePages();
  const { definitions, prefetchDefinitions } = useDefinitions({ page });
  if (page && pages && definitions) {
    const prevPage = page - 1 || 1;
    const nextPage = page + 1 > pages ? pages : page + 1;
    if (page !== prevPage) prefetchDefinitions()({ page: prevPage });
    if (page !== nextPage) prefetchDefinitions()({ page: nextPage });
  }
  return (
    <>
      <Head>
        <title>Kreol</title>
      </Head>
      <Layout>
        {!definitions && [...Array(5).keys()].map((_) => <LoadingDefinition key={_} />)}
        {definitions && definitions.map((data) => <Definition key={data.id} data={data} />)}
        {definitions && (
          <Pagination
            page={page}
            pages={pages}
            pathname="/"
            query={{ page }}
            prefetch={prefetchDefinitions()}
          />
        )}
      </Layout>
    </>
  );
};

export default Home;
