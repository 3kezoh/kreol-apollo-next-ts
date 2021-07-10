import { ReportedQuery, ReportMutation } from "generated/graphql";
import { Definition } from "../Definition";

type Props = { reported: ReportedQuery["report"] | ReportMutation["report"] };

export const ReportConfirmation = ({ reported }: Props) => {
  if (reported) {
    const { definition, reason, message } = reported;
    return (
      <>
        <div>Your report has been received</div>
        <Definition data={definition} />
        <div>{`for ${reason}`}</div>
        <div>{message}</div>
      </>
    );
  }
  return null;
};
