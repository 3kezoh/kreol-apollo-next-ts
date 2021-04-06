import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { Button, Control, Input, Label, Section, Textarea } from "../../components/Bulma";
import { Form, Layout } from "../../components";
import { useAuth } from "../../components/Auth";

const REPORT = gql`
  mutation Report($definition: ID!, $reason: Int!, $message: String) {
    report(definition: $definition, reason: $reason, message: $message) {
      definition {
        author {
          name
        }
        word
        meaning
        example
        createdAt
      }
    }
  }
`;

const Report = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { definition } = router.query;
  const [reason, setReason] = useState(3);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [report] = useMutation(REPORT, {
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
    return report({ variables: { definition, reason, message } });
  };

  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <Layout>
        <Section>
          <Form onSubmit={onSubmit}>
            <Control>
              <Label className="radio">
                <Input
                  type="radio"
                  name="reason"
                  value="0"
                  checked={reason === 0}
                  onChange={(e) => setReason(parseInt(e.target.value, 10))}
                />
                It&#39;s an inside joke or definition that does not seem real
              </Label>
            </Control>
            <Control>
              <Label className="radio">
                <Input
                  type="radio"
                  name="reason"
                  value="1"
                  checked={reason === 1}
                  onChange={(e) => setReason(parseInt(e.target.value, 10))}
                />
                It includes someone&#39;s full name or other personal information
              </Label>
            </Control>
            <Control>
              <Label className="radio">
                <Input
                  type="radio"
                  name="reason"
                  value="2"
                  checked={reason === 2}
                  onChange={(e) => setReason(parseInt(e.target.value, 10))}
                />
                It includes hate speech, bullying, or other hurtful comments
              </Label>
            </Control>
            <Control>
              <Label className="radio">
                <Input
                  type="radio"
                  name="reason"
                  value="3"
                  checked={reason === 3}
                  onChange={(e) => setReason(parseInt(e.target.value, 10))}
                />
                Other
              </Label>
            </Control>
            <Label htmlFor="message">
              Please enter any additional information
              <Control>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Control>
            </Label>
            <Button color="danger">Report</Button>
          </Form>
        </Section>
      </Layout>
    </>
  );
};

export default Report;
