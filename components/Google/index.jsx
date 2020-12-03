import { useAuth } from "../Auth/AuthContext";

const Google = () => {
  const { withGoogle } = useAuth();

  const onClick = async (event) => {
    event.preventDefault();
    await withGoogle();
  };

  return (
    <>
      <button type="submit" onClick={onClick}>
        Log in with google
      </button>
    </>
  );
};

export default Google;
