import { useState } from "react";
import { useAuth } from "../components/Auth/authContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, user, signup } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    await signup(email, password);
  };

  return (
    <>
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

export default Signup;
