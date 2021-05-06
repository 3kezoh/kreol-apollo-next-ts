import Head from "next/head";
import { useAuth } from "@Auth";
import { Section, Columns, Column, Container } from "@Bulma";
import { EditableDefinition, Navbar, Pagination, UserSettings } from "@components";
import { useDefinitions, useQuery, usePages, useDelete } from "@framework/hooks/definition";

const Profile = () => {
  const { id, page } = useQuery();
  const pages = usePages({ author: id });
  const { definitions } = useDefinitions({ page, author: id });
  const { user } = useAuth();

  const onDelete = useDelete({ page, author: id });

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Navbar />
      <Container isMaxDesktop>
        <Columns>
          <Column isOneFifth isHiddenMobile>
            <UserSettings user={user} />
          </Column>
          <Column isTwoThirds="desktop" isFourFifths="tablet">
            <Section>
              {definitions &&
                definitions.map((data) => (
                  <EditableDefinition
                    key={data.id}
                    data={data}
                    onDelete={() => onDelete(data.id)}
                  />
                ))}
              {definitions && (
                <Pagination page={page} pages={pages} pathname="/profile" query={{ page, id }} />
              )}
            </Section>
          </Column>
        </Columns>
      </Container>
    </>
  );
};

export default Profile;
