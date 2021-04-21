import { useState } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { withApollo } from "../apollo";
import { DEFINITIONS } from "../graphql/definition/queries";
import { Columns, Column, Section } from "../components/Bulma";
import { Definition, Layout, Loader, Navbar, Sidebar } from "../components";
import Pagination from "../components/Pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const [definitions, setDefinitions] = useState([]);
  const [count, setCount] = useState(0);

  const { loading } = useQuery(DEFINITIONS, {
    variables: { page },
    onCompleted: ({ definitions }) => {
      setDefinitions([...definitions]);
    },
    fetchPolicy: "cache-and-network",
  });

  const nextPage = () => setPage(page + 1);

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
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
              {loading && <Loader />}
              {definitions.map((definition) => (
                <Definition key={definition.id} data={definition} />
              ))}
              <Pagination
                page={page}
                nextPage={nextPage}
                prevPage={prevPage}
                setPage={setPage}
                count={count}
              />
            </Section>
          </Column>
        </Columns>
      </Layout>
    </>
  );
};

export default withApollo(Home);
