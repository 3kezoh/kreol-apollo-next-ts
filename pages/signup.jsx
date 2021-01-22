import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, Control, Input, Label, Section } from "../components/Bulma";
import { Form, Google, Layout } from "../components";
import { useAuth } from "../components/Auth";

const Signup = () => {
  const router = useRouter();
  const { signupError, signup, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const errors = {};

  if (signupError) {
    signupError.graphQLErrors.forEach(({ extensions }) => {
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
    return signup({ variables: { email, password, confirmPassword, name: "name" } });
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
            {errors.email && <div>{errors.email}</div>}
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
            {errors.password && <div>{errors.password}</div>}
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
            {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
            <Button type="submit">Sign Up</Button>
          </Form>
          <Google />
        </Section>
        {signupError && <div>{`${signupError.message} :c`}</div>}
      </Layout>
    </>
  );
};

export default Signup;
