import Definition from "../Definition";

const ReportConfirmation = ({ reported }) => {
  const { definition, reason, message } = reported;
  const { id, word, meaning, example, author, score, createdAt } = definition;
  return (
    <>
      <div>Your report has been received</div>
      <Definition data={{ id, word, meaning, example, author, score, createdAt }} />
      <div>{`for ${reason}`}</div>
      <div>{message}</div>
    </>
  );
};

export default ReportConfirmation;
