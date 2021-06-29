import { useAuth } from "@Auth";
import { Pagination } from "@components/Bulma/Pagination";

const Test = () => {
  const { user, logout, withGoogle } = useAuth();

  return (
    <>
      <div>{JSON.stringify(user, null, 3)}</div>
      <button type="button" onClick={logout}>
        logout
      </button>
      <button type="button" onClick={withGoogle}>
        google
      </button>
    </>
  );
};

export default Test;
