import Link from "next/link";
import { gql, useQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { fr as locale } from "date-fns/locale";
import { useState, useRef, useEffect } from "react";
import styles from "./Definition.module.css";
import { Button } from "../Bulma";
import { useIntersecting } from "../../hooks";
import { VOTE } from "../../graphql/vote/mutations";

const FORMAT = "d MMMM yyyy";
const POLL_INTERVAL = 10_000;

const DEFINITION = gql`
  query Definition($id: ID!) {
    definition(id: $id) {
      score
    }
  }
`;

const Definition = ({ data: { id, word, meaning, example, author, score: _score, createdAt } }) => {
  const [score, setScore] = useState(_score);
  const ref = useRef();
  const isIntersecting = useIntersecting(ref);
  const variables = { id };
  const { data, startPolling, stopPolling } = useQuery(DEFINITION, { variables });
  const onVote = (data) => setScore(data.vote.definition.score);
  const [vote] = useMutation(VOTE, { onCompleted: onVote });
  const date = format(new Date(createdAt), FORMAT, { locale });

  useEffect(() => {
    if (data) setScore(data.definition.score);
  }, [data]);

  useEffect(() => {
    stopPolling();
    if (isIntersecting) startPolling(POLL_INTERVAL);
    return () => {
      stopPolling();
    };
  }, [isIntersecting]);

  const upvote = () => vote({ variables: { definition: id, action: 1 } });
  const downvote = () => vote({ variables: { definition: id, action: -1 } });

  return (
    <article ref={ref} className={`content p-5 ${styles.definition}`}>
      <h1 className="title">
        <Link href={{ pathname: "/word/[word]", query: { word } }}>
          <a href="/word">{word}</a>
        </Link>
      </h1>
      <p>{meaning}</p>
      {example && <p className="is-italic">{example}</p>}
      <p>{`Posté le ${date} par ${author.name}`}</p>
      <div className={styles.buttons}>
        <Button onClick={upvote}>u</Button>
        <p className={styles.score}>{score}</p>
        <Button onClick={downvote}>d</Button>
      </div>
    </article>
  );
};

export default Definition;
