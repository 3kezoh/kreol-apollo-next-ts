import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { fr as locale } from "date-fns/locale";
import styles from "./Definition.module.css";
import { Button } from "../Bulma";
import { useIntersecting } from "../../hooks";
import { useAuth } from "../Auth";

const DATE_FORMAT = "d MMMM yyyy";
const POLL_INTERVAL = 1000000_10_000;

const GET_SCORE = gql`
  query Definition($id: ID!) {
    definition(id: $id) {
      score
    }
  }
`;

const VOTE_QUERY = gql`
  query Vote($id: ID!) {
    vote(definition: $id) {
      action
    }
  }
`;

const VOTE_MUTATION = gql`
  mutation Vote($id: ID!, $action: Int!) {
    vote(definition: $id, action: $action) {
      definition {
        score
      }
      action
    }
  }
`;

const Definition = ({ data: { id, word, meaning, example, author, score: _score, createdAt } }) => {
  const ref = useRef();
  const isIntersecting = useIntersecting(ref);
  const [score, setScore] = useState(_score);
  const [action, setAction] = useState(0);
  const { user } = useAuth();
  const router = useRouter();
  const date = format(new Date(createdAt), DATE_FORMAT, { locale });

  const { startPolling, stopPolling } = useQuery(GET_SCORE, {
    variables: { id },
    onCompleted: ({ definition }) => {
      if (definition) setScore(definition.score ?? _score);
    },
    fetchPolicy: "cache-and-network",
  });

  useQuery(VOTE_QUERY, {
    variables: { id },
    onCompleted: ({ vote }) => {
      if (vote) setAction(vote.action ?? 0);
    },
    fetchPolicy: "cache-and-network",
  });

  const [vote] = useMutation(VOTE_MUTATION, {
    onCompleted: ({ vote }) => {
      if (vote) {
        setScore(vote.definition.score ?? _score);
        setAction(vote.action ?? action);
      }
    },
  });

  useEffect(() => {
    stopPolling();
    if (isIntersecting) startPolling(POLL_INTERVAL);
    return () => {
      stopPolling();
    };
  }, [isIntersecting]);

  const _vote = (action) => {
    if (!user.isAuthenticated) return router.push("/signup");
    return vote({ variables: { id, action } });
  };

  const upvote = () => _vote(1);
  const downvote = () => _vote(-1);
  const unvote = () => _vote(0);

  return (
    <article ref={ref} className={`content p-5 ${styles.definition}`}>
      <h1 className="title">
        <Link href={`/word/${encodeURIComponent(word)}`}>
          <a href={`/word/${encodeURIComponent(word)}`}>{word}</a>
        </Link>
      </h1>
      <p>{meaning}</p>
      {example && <p className="is-italic">{example}</p>}
      <p>{`Posté le ${date} par ${author.name}`}</p>
      <div className={styles.buttons}>
        <Button onClick={action === 1 ? unvote : upvote}>{action === 1 ? "↑" : "-"}</Button>
        <p className={styles.score}>{score}</p>
        <Button onClick={action === -1 ? unvote : downvote}>{action === -1 ? "↓" : "-"}</Button>
      </div>
    </article>
  );
};

export default Definition;
