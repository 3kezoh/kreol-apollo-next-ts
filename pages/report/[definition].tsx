import { useAuth } from "@Auth";
import { ReportConfirmation, ReportForm } from "@components";
import { getValidationErrors } from "@utils";
import {
  ReportedQuery,
  ReportMutation,
  useReportedLazyQuery,
  useReportMutation,
} from "generated/graphql";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Container, Section } from "react-bulma-components";

type Report = ReportMutation["report"] | ReportedQuery["report"] | null;
type Errors = { message?: string[] };

const Report = () => {
  const router = useRouter();
  const { definition } = router.query;
  const { user, open } = useAuth();
  const [reason, setReason] = useState(3);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [reported, setReported] = useState<Report>(null);

  const [getReported, { called, loading }] = useReportedLazyQuery({
    fetchPolicy: "cache-and-network",
    onError: ({ graphQLErrors }) => setErrors(getValidationErrors(graphQLErrors)),
    onCompleted: ({ report }) => {
      if (report) setReported(report);
    },
  });

  useEffect(() => {
    if (definition) getReported({ variables: { definition: definition as string } });
  }, [definition, getReported]);

  const [report] = useReportMutation({
    onError: ({ graphQLErrors }) => setErrors(getValidationErrors(graphQLErrors)),
    onCompleted: ({ report }) => {
      if (report) setReported(report);
    },
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user.isAuthenticated) return open();
    return report({ variables: { definition: definition as string, reason, message } });
  };

  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <Container breakpoint="desktop" max>
        <Section>
          {reported && <ReportConfirmation reported={reported} />}
          {!reported && called && !loading && (
            <ReportForm
              onSubmit={onSubmit}
              reason={reason}
              setReason={setReason}
              message={message}
              setMessage={setMessage}
            />
          )}
          {errors.message?.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </Section>
      </Container>
    </>
  );
};

export default Report;
