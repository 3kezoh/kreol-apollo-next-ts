import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { Form, Layout } from "../components";
import { Section, Label, Control, Input, Textarea, Button } from "../components/Bulma";
import { useAuth } from "../components/Auth";

const CREATE_DEFINITION = gql`
  mutation CreateDefinition($word: String!, $meaning: String!, $example: String) {
    createDefinition(word: $word, meaning: $meaning, example: $example) {
      id
    }
  }
`;

const Define = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  const [createDefinition] = useMutation(CREATE_DEFINITION, {
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
    await createDefinition({ variables: { word, meaning, example } });
    return router.push("/");
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
                  type="text"
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
            <Button type="submit">Submit</Button>
          </Form>
        </Section>
      </Layout>
    </>
  );
};

export default Define;
