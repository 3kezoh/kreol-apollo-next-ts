import { useAuth } from "@Auth";
import { Login } from "@components";
import { initializeApollo } from "@lib/apollo/utils";
import { stringifyCookie } from "@utils";
import { ssrVerify } from "generated/page";
import { GetServerSideProps } from "next";
import { Button, Content } from "react-bulma-components";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = initializeApollo();
  const context = { headers: { Cookie: stringifyCookie(req.cookies) } };
  const { props } = await ssrVerify.getServerPage({ context }, apolloClient);
  return { props: {} };
};

const Test = () => {
  const { user, logout, open } = useAuth();

  const onClick = () => {
    if (!user.isAuthenticated) open();
  };

  return (
    <>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={onClick}>Action that need authentication</Button>
      <Login />
      <Content>{String(user.isAuthenticated)}</Content>
    </>
  );
};

export default Test;
