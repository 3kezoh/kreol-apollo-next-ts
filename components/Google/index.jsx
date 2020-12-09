import { useAuth } from "../Auth";
import { Button } from "../Bulma";

const Google = () => {
  const { withGoogle } = useAuth();

  const onClick = async (event) => {
    event.preventDefault();
    await withGoogle();
  };

  return <Button onClick={onClick}>Log in with google</Button>;
};

export default Google;
