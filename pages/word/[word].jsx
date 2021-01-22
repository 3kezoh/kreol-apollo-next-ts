import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { withApollo } from "../../apollo";
import { DEFINITIONS } from "../../graphql/definition/queries";
import { Columns, Column, Section } from "../../components/Bulma";
import { Definition, Navbar, Layout, Sidebar } from "../../components";

const Word = () => {
  const router = useRouter();
  const { word } = router.query;
  const [page, setPage] = useState(1);
  const [definitions, setDefinitions] = useState([]);

  useQuery(DEFINITIONS, {
    variables: { word, page },
    onCompleted: (data) => setDefinitions([...definitions, ...data.definitions]),
  });

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
                {definitions.map((data) => (
                  <Definition key={data.id} data={data} />
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
