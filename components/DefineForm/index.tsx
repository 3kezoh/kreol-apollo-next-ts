import { FormEvent, Dispatch, SetStateAction } from "react";
import { Button, Form, Message } from "react-bulma-components";

type Props = {
  errors: { [key: string]: string };
  example: string;
  meaning: string;
  onSubmit: (event: FormEvent) => any;
  setExample: Dispatch<SetStateAction<string>>;
  setTranslation: Dispatch<SetStateAction<string>>;
  setMeaning: Dispatch<SetStateAction<string>>;
  setWord: Dispatch<SetStateAction<string>>;
  word: string;
};

export const DefineForm = ({
  errors,
  example,
  meaning,
  onSubmit,
  setExample,
  setTranslation,
  setMeaning,
  setWord,
  word,
}: Props) => {
  return (
    <form onSubmit={onSubmit} data-cy="define-form">
      <Form.Label htmlFor="word">
        Word
        <Form.Control>
          <Form.Input
            id="word"
            maxLength={50}
            onChange={(e) => setWord(e.target.value)}
            required
            type="text"
            value={word}
            data-cy="word"
          />
        </Form.Control>
      </Form.Label>
      {errors.word && (
        <Message color="danger" data-cy="error-word">
          {errors.word}
        </Message>
      )}
      <Form.Label htmlFor="meaning">
        Meaning
        <Form.Control>
          <Form.Textarea
            id="meaning"
            maxLength={300}
            onChange={(e) => setMeaning(e.target.value)}
            required
            value={meaning}
            data-cy="meaning"
          />
        </Form.Control>
      </Form.Label>
      {errors.meaning && (
        <Message color="danger" data-cy="error-meaning">
          {errors.meaning}
        </Message>
      )}
      <Form.Label htmlFor="example">
        Example
        <Form.Control>
          <Form.Textarea
            id="example"
            maxLength={100}
            onChange={(e) => setExample(e.target.value)}
            value={example}
            data-cy="example"
          />
        </Form.Control>
      </Form.Label>
      {errors.example && (
        <Message color="danger" data-cy="error-example">
          {errors.example}
        </Message>
      )}
      <Form.Label htmlFor="translation">
        Translation
        <Form.Control>
          <Form.Select
            id="translation"
            onChange={(e) => setTranslation(e.target.value)}
            required
            data-cy="translation"
          >
            <option value="fr">French to Guyanese Creole</option>
            <option value="gf">Guyanese Creole to French</option>
          </Form.Select>
        </Form.Control>
      </Form.Label>
      <Button type="submit" data-cy="submit">
        Submit
      </Button>
    </form>
  );
};
