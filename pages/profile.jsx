import { useEffect, useState } from "react";
import Head from "next/head";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../components/Auth";
import { withApollo } from "../apollo";
import { EditableDefinition, Layout, Navbar, UserSettings } from "../components";
import { Section, Columns, Column } from "../components/Bulma";

const GET_DEFINITIONS = gql`
  query Definitions($author: ID!, $page: Int) {
    definitions(filter: { author: $author }, page: $page) {
      definitions {
        id
        word
        meaning
        example
        score
        language
        createdAt
      }
      count
    }
  }
`;

const DELETE_DEFINITION = gql`
  mutation DeleteDefinition($id: ID!) {
    deleteDefinition(id: $id) {
      id
    }
  }
`;

const Profile = () => {
  const [page, setPage] = useState(1);
  const [definitions, setDefinitions] = useState([]);
  const { user } = useAuth();

  const [loadDefinitions] = useLazyQuery(GET_DEFINITIONS, {
    variables: { author: user.id, page },
    onCompleted: (data) => setDefinitions([...definitions, ...data.definitions.definitions]),
    fetchPolicy: "cache-and-network",
  });

  const [onDelete] = useMutation(DELETE_DEFINITION, {
    onCompleted: ({ deleteDefinition }) => {
      if (deleteDefinition) {
        setDefinitions(definitions.filter(({ id }) => deleteDefinition.id !== id));
      }
    },
  });

  useEffect(() => {
    if (user.name) loadDefinitions();
  }, [user.name, page]);

  const next = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Navbar />
      <Layout>
        <Columns>
          <Column isOneFifth isHiddenMobile>
            <UserSettings user={user} />
          </Column>
          <Column isTwoThirds="desktop" isFourFifths="tablet">
            <Section>
              <InfiniteScroll
                dataLength={definitions.length}
                next={next}
                hasMore={definitions.length !== 0}
                scrollThreshold={0.9}
              >
                {definitions.map((definition) => (
                  <EditableDefinition key={definition.id} data={definition} onDelete={onDelete} />
                ))}
              </InfiniteScroll>
            </Section>
          </Column>
        </Columns>
      </Layout>
    </>
  );
};

export default withApollo(Profile);
