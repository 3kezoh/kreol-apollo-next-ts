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

type Props = { data: DefinitionFieldsFragment };

const Definition = ({ data }: Props) => {
  const { id, word, meaning, example, author, language, createdAt } = data;
  const [score, setScore] = useState(data.score);
  const [action, setAction] = useState(data.action);
  const { user } = useAuth();
  const router = useRouter();
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
    if (!user.isAuthenticated) return router.push("/signup");
    return vote({ variables: { definition: id, action } });
  };

  const upvote = () => _vote(1);
  const downvote = () => _vote(-1);
  const unvote = () => _vote(0);

  return (
    <Content p={5} className={styles.definition}>
      <h1>
        <Link href={`/word/${encodeURIComponent(word)}`}>{word}</Link>
      </h1>
      <p>{meaning}</p>
      {example && (
        <Element italic renderAs="p">
          {example}
        </Element>
      )}
      <p>
        {`Posté le ${date} par `}
        <Link
          href={{
            pathname: `/author/${encodeURIComponent(author.name)}`,
            query: { id: author.id },
          }}
        >
          {author.name}
        </Link>
      </p>
      <div className={styles.buttons}>
        <Button onClick={action === 1 ? unvote : upvote}>{action === 1 ? "↑" : "-"}</Button>
        <p className={styles.score}>{score}</p>
        <Button onClick={action === -1 ? unvote : downvote}>{action === -1 ? "↓" : "-"}</Button>
      </div>
      <Element display="flex" flexDirection="row" alignItems="center">
        <div className={styles.language}>
          {language === "fr" ? <span>&#x1F1EB;&#x1F1F7;</span> : <span>&#x1F1EC;&#x1F1EB;</span>}
          &#x27A1;
          {language === "fr" ? <span>&#x1F1EC;&#x1F1EB;</span> : <span>&#x1F1EB;&#x1F1F7;</span>}
        </div>
        <div className={styles.reportButton}>
          <Button color="danger" outlined>
            <Link href={`/report/${encodeURIComponent(id)}`}>Report</Link>
          </Button>
        </div>
      </Element>
    </Content>
  );
};

export default Definition;
