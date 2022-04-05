import { useAuth } from "@Auth";
import {
  EditableDefinition,
  LoadingDefinition,
  Navbar,
  Pagination,
  UserSettings,
} from "@components";
import { useDefinitions, usePages, useQuery } from "@hooks";
import { useDeleteDefinitionMutation } from "generated/graphql";
import Head from "next/head";
import { useRouter } from "next/router";
import { Columns, Container, Section } from "react-bulma-components";

const Profile = () => {
  const { user } = useAuth();
  const { id, page } = useQuery();
  const pages = usePages({ author: id });
  const [definitions, setDefinitions] = useDefinitions({ page, author: id });

  const [deleteDefinition] = useDeleteDefinitionMutation({ fetchPolicy: "no-cache" });

  const onDelete = async (id: string) => {
    await deleteDefinition({
      variables: { id },
      update: (cache) => {
        cache.evict({ id: `Definition:${id}` });
        cache.gc();
      },
    });

    setDefinitions(definitions.filter((definition) => definition?.id !== id));
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Navbar />
      <Container breakpoint="desktop" max>
        <Columns>
          <Columns.Column size="one-fifth" mobile={{ display: "hidden" }}>
            <UserSettings user={user} />
          </Columns.Column>
          <Columns.Column desktop={{ size: "two-thirds" }} tablet={{ size: "four-fifths" }}>
            <Section>
              {definitions.length === 0 &&
                Array(5)
                  .fill(null)
                  .map((_, i) => <LoadingDefinition key={i} />)}
              {definitions &&
                definitions.map(
                  (definition) =>
                    definition && (
                      <EditableDefinition
                        key={definition.id}
                        data={definition}
                        onDelete={() => onDelete(definition.id)}
                      />
                    )
                )}
              {definitions.length > 0 && (
                <Pagination page={page} pages={pages} pathname="/profile" query={{ page, id }} />
              )}
            </Section>
          </Columns.Column>
        </Columns>
      </Container>
    </>
  );
};

export default Profile;
