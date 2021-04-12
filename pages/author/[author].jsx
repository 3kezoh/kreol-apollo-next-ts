import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql, useLazyQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { withApollo } from "../../apollo";
import { Columns, Column, Section } from "../../components/Bulma";
import { Definition, Navbar, Layout, Sidebar } from "../../components";

const GET_DEFINITIONS_BY_AUTHOR = gql`
  query Definitions($author: ID!, $page: Int) {
    definitions(filter: { author: $author }, page: $page) {
      id
      word
      meaning
      example
      score
      language
      author {
        id
        name
      }
      createdAt
    }
  }
`;

const Author = () => {
  const router = useRouter();
  const { id: author } = router.query;
  const [page, setPage] = useState(1);
  const [definitions, setDefinitions] = useState([]);

  const [loadDefinitions] = useLazyQuery(GET_DEFINITIONS_BY_AUTHOR, {
    variables: { author, page },
    onCompleted: (data) => setDefinitions([...definitions, ...data.definitions]),
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (author) loadDefinitions();
  }, [author, page]);

  const next = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>User Profile</title>
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
                hasMore={definitions.length !== 0}
                scrollThreshold={0.9}
              >
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

export default withApollo(Author);
