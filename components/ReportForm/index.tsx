import { Dispatch, FormEvent, SetStateAction } from "react";
import { Button, Form } from "react-bulma-components";

type Props = {
  onSubmit: (event: FormEvent) => any;
  reason: number;
  setReason: Dispatch<SetStateAction<number>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};

export const ReportForm = ({ onSubmit, reason, setReason, message, setMessage }: Props) => (
  <form onSubmit={onSubmit}>
    <Form.Control>
      <Form.Label className="radio">
        <Form.Radio
          type="radio"
          name="reason"
          value="0"
          checked={reason === 0}
          onChange={(e) => setReason(parseInt(e.target.value, 10))}
        />
        It&#39;s an inside joke or definition that does not seem real
      </Form.Label>
    </Form.Control>
    <Form.Control>
      <Form.Label className="radio">
        <Form.Radio
          type="radio"
          name="reason"
          value="1"
          checked={reason === 1}
          onChange={(e) => setReason(parseInt(e.target.value, 10))}
        />
        It includes someone&#39;s full name or other personal information
      </Form.Label>
    </Form.Control>
    <Form.Control>
      <Form.Label className="radio">
        <Form.Radio
          type="radio"
          name="reason"
          value="2"
          checked={reason === 2}
          onChange={(e) => setReason(parseInt(e.target.value, 10))}
        />
        It includes hate speech, bullying, or other hurtful comments
      </Form.Label>
    </Form.Control>
    <Form.Control>
      <Form.Label className="radio">
        <Form.Radio
          type="radio"
          name="reason"
          value="3"
          checked={reason === 3}
          onChange={(e) => setReason(parseInt(e.target.value, 10))}
        />
        Other
      </Form.Label>
    </Form.Control>
    {reason === 3 && (
      <Form.Label htmlFor="message">
        Please enter any additional information
        <Form.Control>
          <Form.Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Control>
      </Form.Label>
    )}
    <Button color="danger">Report</Button>
  </form>
);
