import { useAuth } from "@Auth";
import { useCreateDefinitionMutation } from "generated/graphql";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Button, Container, Form, Section } from "react-bulma-components";
import { getValidationErrors } from "../utils";

const Define = () => {
  const { user, open } = useAuth();
  const router = useRouter();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [language, setLanguage] = useState("fr");
  const [errors, setErrors] = useState<{ [i: string]: string }>({});

  const [createDefinition] = useCreateDefinitionMutation({
    onCompleted: () => router.back(),
    onError: ({ graphQLErrors }) => setErrors(getValidationErrors(graphQLErrors)),
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user.isAuthenticated) return open();
    return createDefinition({ variables: { word, meaning, example, language } });
  };

  return (
    <>
      <Head>
        <title>Define</title>
      </Head>
      <Container breakpoint="desktop" max>
        <Section>
          <form onSubmit={onSubmit}>
            <Form.Label htmlFor="word">
              Word
              <Form.Control>
                <Form.Input
                  id="word"
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
              </Form.Control>
            </Form.Label>
            {errors.word && <div>{errors.word}</div>}
            <Form.Label htmlFor="meaning">
              Meaning
              <Form.Control>
                <Form.Textarea
                  id="meaning"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                />
              </Form.Control>
            </Form.Label>
            {errors.meaning && <div>{errors.meaning}</div>}
            <Form.Label htmlFor="example">
              Example
              <Form.Control>
                <Form.Textarea
                  id="example"
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                />
              </Form.Control>
            </Form.Label>
            {errors.example && <div>{errors.example}</div>}
            <Form.Label htmlFor="language">
              Language
              <Form.Control>
                <Form.Select id="language" onChange={(e) => setLanguage(e.target.value)}>
                  <option value="fr">Français</option>
                  <option value="gf">Créole Guyanais</option>
                </Form.Select>
              </Form.Control>
            </Form.Label>
            <Button type="submit">Submit</Button>
          </form>
        </Section>
      </Container>
    </>
  );
};

export default Define;
