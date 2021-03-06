import { useAuth } from "@Auth";
import { format } from "date-fns";
import { fr as locale } from "date-fns/locale";
import {
  DefinitionFieldsFragment,
  useDefinitionSubscription,
  useVoteMutation,
} from "generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Content, Element } from "react-bulma-components";
import styles from "./Definition.module.css";

const DATE_FORMAT = "d MMMM yyyy";

type Props = { data: DefinitionFieldsFragment; reportConfirmation?: boolean };

export const Definition = ({ data, reportConfirmation }: Props) => {
  const { user, open } = useAuth();
  const router = useRouter();
  const { id, word, meaning, example, author, translation, createdAt } = data;
  const [score, setScore] = useState(data.score);
  const [action, setAction] = useState(data.action);
  const date = format(new Date(createdAt), DATE_FORMAT, { locale });

  const [vote] = useVoteMutation({
    onCompleted: ({ vote }) => {
      if (vote) {
        setScore(vote.definition.score);
        setAction(vote.action);
      }
    },
  });

  useDefinitionSubscription({
    variables: { id },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) setScore(subscriptionData.data.definition.score);
    },
  });

  const _vote = (action: -1 | 0 | 1) => {
    if (!user.isAuthenticated) return open();
    return vote({ variables: { definition: id, action } });
  };

  const upvote = () => _vote(1);
  const downvote = () => _vote(-1);
  const unvote = () => _vote(0);

  const onReport = () => {
    if (!user.isAuthenticated) return open();
    router.push(`/report/${encodeURIComponent(id)}`);
  };

  return (
    <Content renderAs="article" className={styles.definition} data-cy="definition">
      <h1 data-cy="word">
        <Link href={`/word/${encodeURIComponent(word)}`}>{word}</Link>
      </h1>
      <p>{meaning}</p>
      {example && (
        <Element italic renderAs="p">
          {example}
        </Element>
      )}
      <p>
        {`Post?? le ${date} par `}
        <Link
          href={{
            pathname: `/author/${encodeURIComponent(author.name)}`,
            query: { id: author.id },
          }}
        >
          <a data-cy="author">{author.name}</a>
        </Link>
      </p>
      <div className={styles.buttons}>
        <Button
          onClick={action === 1 ? unvote : upvote}
          data-cy={action === 1 ? `unvote-${word}` : `upvote-${word}`}
        >
          {action === 1 ? "???" : "-"}
        </Button>
        <p className={styles.score} data-cy={`score-${word}`}>
          {score}
        </p>
        <Button
          onClick={action === -1 ? unvote : downvote}
          data-cy={action === -1 ? `unvote-${word}` : `downvote-${word}`}
        >
          {action === -1 ? "???" : "-"}
        </Button>
      </div>
      <Element display="flex" flexDirection="row" alignItems="center">
        <div className={styles.translation}>
          {translation === "fr" ? <span>&#x1F1EB;&#x1F1F7;</span> : <span>&#x1F1EC;&#x1F1EB;</span>}
          &#x27A1;
          {translation === "fr" ? <span>&#x1F1EC;&#x1F1EB;</span> : <span>&#x1F1EB;&#x1F1F7;</span>}
        </div>
        <div className={styles.reportButton}>
          {!reportConfirmation && (
            <Button color="danger" outlined onClick={onReport} data-cy="report">
              Report
            </Button>
          )}
        </div>
      </Element>
    </Content>
  );
};
