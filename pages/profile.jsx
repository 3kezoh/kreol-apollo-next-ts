import { useState } from "react";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { useAuth } from "@Auth";
import { Section, Columns, Column } from "@Bulma";
import { EditableDefinition, Layout, Navbar, Pagination, UserSettings } from "@components";
import { getAllDefinitions, getCount } from "@framework/definition";
import { DELETE_DEFINITION } from "@graphql/definition/mutations";

const DEFINITIONS_PER_PAGES = 10;

const getServerSideProps = async ({ query, req }) => {
  const { cookies } = req;
  const { token } = cookies;
  const { id = null, page = 1 } = query;
  const limit = DEFINITIONS_PER_PAGES;
  const definitions = await getAllDefinitions({ author: id, page, limit, token });
  const count = await getCount({ author: id });
  const pages = Math.ceil(count / DEFINITIONS_PER_PAGES);
  return { props: { definitions, id, page: +page, pages } };
};

const Profile = ({ definitions: _definitions, id, page, pages }) => {
  const [definitions, setDefinitions] = useState(_definitions);
  const { user } = useAuth();

  const [onDelete] = useMutation(DELETE_DEFINITION, {
    onCompleted: ({ deleteDefinition }) => {
      if (deleteDefinition) {
        setDefinitions(definitions.filter(({ id }) => deleteDefinition.id !== id));
      }
    },
  });

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
              {definitions &&
                definitions.map((definition) => (
                  <EditableDefinition key={definition.id} data={definition} onDelete={onDelete} />
                ))}
              {definitions && pages > 1 && (
                <Pagination page={page} pages={pages} pathname="/profile" query={{ page, id }} />
              )}
            </Section>
          </Column>
        </Columns>
      </Layout>
    </>
  );
};

export default Profile;
export { getServerSideProps };
