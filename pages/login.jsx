import { useState } from "react";
import { useAuth } from "../components/Auth/AuthContext";
import Google from "../components/Google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, user, login, logout } = useAuth();

  const validationErrors = {};

  if (error && error.graphQLErrors[0].extensions.validationErrors) {
    error.graphQLErrors[0].extensions.validationErrors.forEach(({ field, message }) => {
      validationErrors[field] = message;
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await login({ variables: { email, password } });
  };

  return (
    <>
      <button type="submit" onClick={logout}>
        Log Out
      </button>
      <Google />
      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          email
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {validationErrors.email && <div>{validationErrors.email}</div>}
        <label htmlFor="password">
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {validationErrors.password && <div>{validationErrors.password}</div>}
        <button type="submit">Log In</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{`${error.message} :c`}</div>}
      {user.isAuthenticated && <div>{`Hello ${user.email}`}</div>}
    </>
  );
};

export default Login;
