import { useAuth } from "@Auth";
import { format } from "date-fns";
import { fr as locale } from "date-fns/locale";
import { DefinitionFieldsFragment, useVoteMutation } from "generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Element, Content } from "react-bulma-components";
import styles from "./EditableDefinition.module.css";

const DATE_FORMAT = "d MMMM yyyy";

type Props = { data: DefinitionFieldsFragment; onDelete: () => void };

export const EditableDefinition = ({ data, onDelete }: Props) => {
  const { id, word, meaning, example, translation, createdAt } = data;
  const [score, setScore] = useState(data.score);
  const [action, setAction] = useState(data.action);
  const { user } = useAuth();
  const router = useRouter();
  const date = format(new Date(createdAt), DATE_FORMAT, { locale });

  const [vote] = useVoteMutation({
    onCompleted: ({ vote }) => {
      setScore(vote?.definition?.score ?? data.score);
      setAction(vote?.action ?? action);
    },
  });

  const _vote = (action: -1 | 0 | 1) => {
    if (!user.isAuthenticated) return router.push("/signup");
    return vote({ variables: { definition: id, action } });
  };

  const upvote = () => _vote(1);
  const downvote = () => _vote(-1);
  const unvote = () => _vote(0);

  return (
    <Content className={styles.definition}>
      <h1 id={styles.title}>
        <Link href={`/word/${encodeURIComponent(word)}`}>
          <a href={`/word/${encodeURIComponent(word)}`} data-cy="word">
            {word}
          </a>
        </Link>
      </h1>
      <p data-cy="meaning">{meaning}</p>
      {example && (
        <p className="is-italic" data-cy="example">
          {example}
        </p>
      )}
      <p>{`Posté le ${date}`}</p>
      <div className={styles.buttons}>
        <Button onClick={action === 1 ? unvote : upvote}>{action === 1 ? "↑" : "-"}</Button>
        <p className={styles.score}>{score}</p>
        <Button onClick={action === -1 ? unvote : downvote}>{action === -1 ? "↓" : "-"}</Button>
      </div>
      <Element display="flex" flexDirection="row" alignItems="center">
        <div className={styles.translation} data-cy={`translation-${word}`}>
          {translation === "fr" ? <span>&#x1F1EB;&#x1F1F7;</span> : <span>&#x1F1EC;&#x1F1EB;</span>}
          &#x27A1;
          {translation === "fr" ? <span>&#x1F1EC;&#x1F1EB;</span> : <span>&#x1F1EB;&#x1F1F7;</span>}
        </div>
        <div className={styles.deleteButton}>
          <Button color="danger" outlined onClick={onDelete} data-cy="delete">
            Delete
          </Button>
        </div>
      </Element>
    </Content>
  );
};
