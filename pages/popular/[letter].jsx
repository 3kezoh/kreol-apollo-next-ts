import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import { gql, useLazyQuery } from "@apollo/client";
import { Columns, Column, Section } from "../../components/Bulma";
import { Layout, Navbar, Sidebar, Definition } from "../../components";

const GET_DEFINITIONS_BY_LETTER = gql`
  query Definitions($letter: String!, $page: Int) {
    definitions(filter: { letter: $letter }, page: $page) {
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

const Popular = () => {
  const router = useRouter();
  const { letter } = router.query;

  const [page, setPage] = useState(1);
  const [definitions, setDefinitions] = useState([]);
  const [lastLetter, setLastLetter] = useState();

  const [loadDefinitions] = useLazyQuery(GET_DEFINITIONS_BY_LETTER, {
    variables: { letter, page },
    onCompleted: (data) => {
      setLastLetter(letter);
      if (letter !== lastLetter) {
        setDefinitions([...data.definitions]);
      } else {
        setDefinitions([...definitions, ...data.definitions]);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (letter !== lastLetter) setPage(1);
    if (letter) loadDefinitions();
  }, [letter, page]);

  const next = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>Popular</title>
      </Head>
      <Navbar />
      <Layout>
        <Columns>
          <Column isOneFifth isHiddenMobile>
            <Sidebar />
          </Column>
          <Column>
            <Section>
              <InfiniteScroll
                dataLength={definitions.length}
                next={next}
                hasMore
                scrollThreshold={0.9}
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

export default Popular;
