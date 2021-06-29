import { useAuth } from "@Auth";
import { Button, Flex } from "@Bulma";
import { format } from "date-fns";
import { fr as locale } from "date-fns/locale";
import { useVoteMutation } from "generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./EditableDefinition.module.css";

const DATE_FORMAT = "d MMMM yyyy";

const EditableDefinition = ({ data, onDelete }) => {
  const { id, word, meaning, example, language, createdAt } = data;
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
    return vote({ variables: { id, action } });
  };

  const upvote = () => _vote(1);
  const downvote = () => _vote(-1);
  const unvote = () => _vote(0);

  return (
    <article className={`content p-5 ${styles.definition}`}>
      <h1 id={styles.title}>
        <Link href={`/word/${encodeURIComponent(word)}`}>
          <a href={`/word/${encodeURIComponent(word)}`}>{word}</a>
        </Link>
      </h1>
      <p>{meaning}</p>
      {example && <p className="is-italic">{example}</p>}
      <p>{`Posté le ${date}`}</p>
      <div className={styles.buttons}>
        <Button onClick={action === 1 ? unvote : upvote}>{action === 1 ? "↑" : "-"}</Button>
        <p className={styles.score}>{score}</p>
        <Button onClick={action === -1 ? unvote : downvote}>{action === -1 ? "↓" : "-"}</Button>
      </div>
      <Flex direction="row" alignItems="center">
        <div className={styles.language}>
          {language === "fr" ? <span>&#x1F1EB;&#x1F1F7;</span> : <span>&#x1F1EC;&#x1F1EB;</span>}
          &#x27A1;
          {language === "fr" ? <span>&#x1F1EC;&#x1F1EB;</span> : <span>&#x1F1EB;&#x1F1F7;</span>}
        </div>
        <div className={styles.deleteButton}>
          <Button
            color="danger"
            buttonStyle="outlined"
            onClick={() => onDelete({ variables: { id } })}
          >
            Delete
          </Button>
        </div>
      </Flex>
    </article>
  );
};

export default EditableDefinition;
