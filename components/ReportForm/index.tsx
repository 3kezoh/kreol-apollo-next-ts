import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { Button, Form } from "react-bulma-components";

type Props = {
  onSubmit: (event: FormEvent) => any;
  reason: number;
  setReason: Dispatch<SetStateAction<number>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};

export const ReportForm = ({ onSubmit, reason, setReason, message, setMessage }: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setReason(parseInt(e.target.value, 10));

  return (
    <form onSubmit={onSubmit}>
      <Form.Control>
        <Form.Radio
          type="radio"
          name="reason"
          value="0"
          checked={reason === 0}
          onChange={onChange}
          data-cy="reason-0"
        >
          It&#39;s an inside joke or definition that does not seem real
        </Form.Radio>
      </Form.Control>
      <Form.Control>
        <Form.Radio
          type="radio"
          name="reason"
          value="1"
          checked={reason === 1}
          onChange={onChange}
          data-cy="reason-1"
        >
          It includes someone&#39;s full name or other personal information
        </Form.Radio>
      </Form.Control>
      <Form.Control>
        <Form.Radio
          type="radio"
          name="reason"
          value="2"
          checked={reason === 2}
          onChange={onChange}
          data-cy="reason-2"
        >
          It includes hate speech, bullying, or other hurtful comments
        </Form.Radio>
      </Form.Control>
      <Form.Control>
        <Form.Radio
          type="radio"
          name="reason"
          value="3"
          checked={reason === 3}
          onChange={onChange}
          data-cy="reason-3"
        >
          Other
        </Form.Radio>
      </Form.Control>
      {reason === 3 && (
        <Form.Label htmlFor="message">
          Please enter any additional information
          <Form.Control>
            <Form.Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              data-cy="reason-3-textarea"
            />
          </Form.Control>
        </Form.Label>
      )}
      <Button color="danger" data-cy="report">
        Report
      </Button>
    </form>
  );
};
