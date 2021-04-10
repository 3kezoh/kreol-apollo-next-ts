import Form from "../Form";
import { Button, Control, Input, Label, Textarea } from "../Bulma";

const ReportForm = ({ onSubmit, reason, setReason, message, setMessage }) => (
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
        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </Control>
    </Label>
    <Button color="danger">Report</Button>
  </Form>
);

export default ReportForm;
