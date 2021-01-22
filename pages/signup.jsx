import Head from "next/head";
import { useState } from "react";
import { Button, Control, Input, Label, Section } from "../components/Bulma";
import { Form, Google, Layout } from "../components";
import { useAuth } from "../components/Auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    await signup({ variables: { email, password, confirmPassword, name: "name" } });
    
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Layout>
        <Section>
          <Form onSubmit={onSubmit}>
            <Label htmlFor="email">
              email
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
              password
              <Control>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Control>
            </Label>
            <Label htmlFor="confirmPassword">
              confirmPassword
              <Control>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Control>
            </Label>
            <Button type="submit">Sign Up</Button>
          </Form>
          <Google />
        </Section>
        {/* {loading && <div>Loading...</div>} */}
        {error && <div>{`${error.message} :c`}</div>}
        {/* {error &&
        error.graphQLErrors[0].extensions.validationErrors.map((validationError) => (
          <div>{validationError.message}</div>
        ))} */}
        {/* {user.isAuthenticated && <div>{`Hello ${user.email}`}</div>} */}
      </Layout>
    </>
  );
};

export default Signup;
