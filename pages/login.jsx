import { useState } from "react";
import { useAuth } from "../components/Auth/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, user, login } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <button type="submit" onClick={() => localStorage.removeItem("token")}>
        Log Out
      </button>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          email
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{`${error.message} :c`}</div>}
      {user.isAuthenticated && <div>{`Hello ${user.email}`}</div>}
    </>
  );
};

export default Login;
