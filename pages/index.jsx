import { useState } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { withApollo } from "../apollo";
import { DEFINITIONS } from "../graphql/definition/queries";
import { Columns, Column, Section } from "../components/Bulma";
import { Definition, Layout, Loader, Navbar, Sidebar } from "../components";

const Home = () => {
  const [page, setPage] = useState(1);
  const [definitions, setDefinitions] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useQuery(DEFINITIONS, {
    variables: { page },
    onCompleted: (data) => {
      if (data.definitions.length) return setDefinitions([...definitions, ...data.definitions]);
      return setHasMore(false);
    },
    fetchPolicy: "cache-and-network",
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
                hasMore={hasMore}
                scrollThreshold={0.9}
                loader={<Loader />}
              >
                {definitions.map((definition) => (
                  <Definition key={definition.id} data={definition} />
                ))}
              </InfiniteScroll>
            </Section>
          </Column>
        </Columns>
      </Layout>
    </>
  );
};

export default withApollo(Home);
