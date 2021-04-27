import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuth } from "@Auth";
import { Section } from "@Bulma";
import { Layout, ReportForm, ReportConfirmation } from "@components";
import { handleGraphQLError } from "../../utils";

const REPORT = gql`
  mutation ReportMutation($definition: ID!, $reason: Int!, $message: String) {
    report(definition: $definition, reason: $reason, message: $message) {
      definition {
        id
        word
        meaning
        example
        score
        createdAt
        author {
          name
        }
      }
      reason
      message
    }
  }
`;

const GET_REPORT = gql`
  query Report($definition: ID!) {
    report(definition: $definition) {
      definition {
        id
        word
        meaning
        example
        score
        createdAt
        author {
          name
        }
      }
      reason
      message
    }
  }
`;

const Report = () => {
  const router = useRouter();
  const { definition } = router.query;
  const { user } = useAuth();
  const [reason, setReason] = useState(3);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [reported, setReported] = useState(null);

  useQuery(GET_REPORT, {
    variables: { definition },
    onCompleted: ({ report }) => setReported(report),
    fetchPolicy: "cache-and-network",
  });

  const [report] = useMutation(REPORT, {
    onCompleted: ({ report }) => setReported(report),
    onError: ({ graphQLErrors }) => handleGraphQLError({ graphQLErrors, setErrors }),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!user.isAuthenticated) return router.push("/signup");
    return report({ variables: { definition, reason, message } });
  };

  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <Layout>
        <Section>
          {reported ? (
            <ReportConfirmation reported={reported} />
          ) : (
            <ReportForm
              onSubmit={onSubmit}
              reason={reason}
              setReason={setReason}
              message={message}
              setMessage={setMessage}
            />
          )}
        </Section>
      </Layout>
    </>
  );
};

export default Report;
