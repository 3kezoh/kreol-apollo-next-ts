import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/Auth";
import { Button, Control, Input, Label } from "../components/Bulma";
import Form from "../components/Form";
import Google from "../components/Google";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, user, login } = useAuth();

  const validationErrors = {};

  if (error && error.graphQLErrors[0].extensions.validationErrors) {
    error.graphQLErrors[0].extensions.validationErrors.forEach(({ field, message }) => {
      validationErrors[field] = message;
    });
  }

  const onSubmit = async (event) => {
    if (user.isAuthenticated) {
      return router.push("/");
    }
    event.preventDefault();
    await login({ variables: { email, password } });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Label htmlFor="email">
          Email
          <Control>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Control>
        </Label>
        <Label htmlFor="password">
          Password
          <Control>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Control>
        </Label>
        <Button>Log In</Button>
      </Form>
      <Google />
    </>
  );
};

export default Login;
