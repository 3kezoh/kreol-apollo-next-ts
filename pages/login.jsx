import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@Auth";
import { Button, Container, Control, Input, Label, Section } from "@Bulma";
import { Form, Google } from "@components";

const Login = () => {
  const router = useRouter();
  const { loginError, user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errors = {};

  if (loginError) {
    loginError.graphQLErrors.forEach(({ extensions }) => {
      if (extensions.validationErrors) {
        extensions.validationErrors.forEach(({ field, message }) => {
          errors[field] = message;
        });
      }
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (user.isAuthenticated) {
      return router.push("/");
    }
    return login({ variables: { email, password } });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container isMaxDesktop>
        <Section>
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
            {errors.email && <div>{errors.email}</div>}
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
            {errors.password && <div>{errors.password}</div>}
            <Button>Log In</Button>
          </Form>
          <Google />
        </Section>
      </Container>
    </>
  );
};

export default Login;
