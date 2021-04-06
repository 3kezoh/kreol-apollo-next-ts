import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { Form, Layout } from "../components";
import { Section, Select, Label, Control, Input, Textarea, Button } from "../components/Bulma";
import { useAuth } from "../components/Auth";

const CREATE_DEFINITION = gql`
  mutation CreateDefinition(
    $word: String!
    $meaning: String!
    $example: String
    $language: String!
  ) {
    createDefinition(word: $word, meaning: $meaning, example: $example, language: $language) {
      id
    }
  }
`;

const Define = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [language, setLanguage] = useState("fr");
  const [errors, setErrors] = useState({});

  const [createDefinition] = useMutation(CREATE_DEFINITION, {
    onCompleted: () => router.push("/"),
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions.validationErrors) {
          const errors = {};
          extensions.validationErrors.forEach(({ field, message }) => {
            errors[field] = message;
          });
          setErrors(errors);
        }
      });
    },
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
      <Layout>
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
                  <option value="gy">Créole Guyanais</option>
                </Select>
              </Control>
            </Label>
            <Button type="submit">Submit</Button>
          </Form>
        </Section>
      </Layout>
    </>
  );
};

export default Define;
