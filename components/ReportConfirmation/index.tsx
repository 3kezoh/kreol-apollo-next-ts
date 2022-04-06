import { ReportedQuery, ReportMutation } from "generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Content } from "react-bulma-components";
import { Definition } from "../Definition";

type Props = { reported: ReportedQuery["report"] | ReportMutation["report"] };

export const ReportConfirmation = ({ reported }: Props) => {
  const router = useRouter();

  if (reported) {
    const { definition, reason, message } = reported;
    return (
      <Content>
        <h1>Your report was received for the following definition</h1>
        <Definition data={definition} reportConfirmation />
        <p>This is what you said :</p>
        <p data-cy="message">{message}</p>
      </Content>
    );
  }
  return null;
};
