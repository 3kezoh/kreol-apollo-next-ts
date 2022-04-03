import { useAuth } from "@Auth";
import { DefineForm } from "@components";
import { useCreateDefinitionMutation } from "generated/graphql";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Container, Section } from "react-bulma-components";
import { getValidationErrors } from "../utils";

const Define = () => {
  const { user, open } = useAuth();
  const router = useRouter();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [translation, setTranslation] = useState("fr");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // TODO redirect back

  const [createDefinition] = useCreateDefinitionMutation({
    onCompleted: () => router.push("/"),
    onError: ({ graphQLErrors }) => setErrors(getValidationErrors(graphQLErrors)),
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user.isAuthenticated) return open();
    return createDefinition({ variables: { word, meaning, example, translation: translation } });
  };

  return (
    <>
      <Head>
        <title>Define</title>
      </Head>
      <Container breakpoint="desktop" max>
        <Section>
          <DefineForm
            errors={errors}
            example={example}
            meaning={meaning}
            onSubmit={onSubmit}
            setExample={setExample}
            setTranslation={setTranslation}
            setMeaning={setMeaning}
            setWord={setWord}
            word={word}
          />
        </Section>
      </Container>
    </>
  );
};

export default Define;
