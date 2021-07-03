import { useAuth } from "@Auth";
import { Login } from "@components";
import { MouseEvent } from "react";
import { Button, Content } from "react-bulma-components";

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
