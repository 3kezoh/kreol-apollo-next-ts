import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { withApollo } from "../../apollo";
import { DEFINITIONS as query } from "../../graphql/definition/queries";
import { Columns, Column, Section } from "../../components/Bulma";
import { Definition, Navbar, Layout, Sidebar } from "../../components";

const Word = () => {
  const router = useRouter();
  const { word } = router.query;
  const [page, setPage] = useState(1);
  const [definitions, setDefinitions] = useState([]);
  const variables = { word, page };
  const onCompleted = (data) => setDefinitions([...definitions, ...data.definitions]);
  const options = { variables, onCompleted };
  useQuery(query, options);

  const next = () => {
    setPage(page + 1);
  };

  return (
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
              <InfiniteScroll
                dataLength={definitions.length}
                next={next}
                hasMore
                scrollThreshold={0.9}>
                {definitions.map(({ id, ...data }) => (
                  <Definition key={id} data={data} />
                ))}
              </InfiniteScroll>
            </Section>
          </Column>
        </Columns>
      </Layout>
    </>
  );
};

export default withApollo(Word);
