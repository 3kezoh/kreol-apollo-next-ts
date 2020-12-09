import Head from "next/head";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { withApollo } from "../apollo";
import { DEFINITIONS } from "../graphql/definition/queries";
import { Columns, Column } from "../components/Bulma";
import { Definition, Navbar, Layout } from "../components";

const Home = () => {
  const [page, setPage] = useState(1);
  const [definitions, setDefinitions] = useState([]);
  const variables = { page };
  const onCompleted = (data) => setDefinitions([...definitions, ...data.definitions]);
  useQuery(DEFINITIONS, { variables, onCompleted });

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
            Sidebar
          </Column>
          <Column isTwoThirds="desktop" isFourFifths="tablet">
            <InfiniteScroll
              dataLength={definitions.length}
              next={next}
              hasMore
              scrollThreshold={0.9}>
              {definitions.map(({ id, ...data }) => (
                <Definition key={id} data={data} />
              ))}
            </InfiniteScroll>
          </Column>
        </Columns>
      </Layout>
    </>
  );
};

export default withApollo(Home);
