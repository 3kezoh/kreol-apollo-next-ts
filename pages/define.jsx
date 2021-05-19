import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useAuth } from "@Auth";
import { Button, Container, Control, Input, Label, Section, Select, Textarea } from "@Bulma";
import { Form } from "@components";
import { CREATE_DEFINITION } from "@graphql/definition/mutations";
import { handleGraphQLError } from "../utils";

const Define = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [language, setLanguage] = useState("fr");
  const [errors, setErrors] = useState({});

  const [createDefinition] = useMutation(CREATE_DEFINITION, {
    onCompleted: () => router.back(),
    onError: ({ graphQLErrors }) => handleGraphQLError({ graphQLErrors, setErrors }),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!user.isAuthenticated) return router.push("/signup");
    return createDefinition({ variables: { word, meaning, example, language } });
  };

  return (
    <>
      <Head>
        <title>Define</title>
      </Head>
      <Container isMaxDesktop>
        <Section>
          <Form onSubmit={onSubmit}>
            <Label htmlFor="word">
              Word
              <Control>
                <Input
                  id="word"
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
              </Control>
            </Label>
            {errors.word && <div>{errors.word}</div>}
            <Label htmlFor="meaning">
              Meaning
              <Control>
                <Textarea
                  id="meaning"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                />
              </Control>
            </Label>
            {errors.meaning && <div>{errors.meaning}</div>}
            <Label htmlFor="example">
              Example
              <Control>
                <Textarea
                  id="example"
                  type="text"
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                />
              </Control>
            </Label>
            {errors.example && <div>{errors.example}</div>}
            <Label htmlFor="language">
              Language
              <Control>
                <Select id="language" onChange={(e) => setLanguage(e.target.value)}>
                  <option value="fr">Français</option>
                  <option value="gf">Créole Guyanais</option>
                </Select>
              </Control>
            </Label>
            <Button type="submit">Submit</Button>
          </Form>
        </Section>
      </Container>
    </>
  );
};

export default Define;
