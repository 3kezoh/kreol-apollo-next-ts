import { useState } from "react";
import { useAuth } from "../components/Auth/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    await signup({ variables: { email, password, confirmPassword } });
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
        <label htmlFor="confirmPassword">
          confirmPassword
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      {/* {loading && <div>Loading...</div>} */}
      {error && <div>{`${error.message} :c`}</div>}
      {/* {error &&
        error.graphQLErrors[0].extensions.validationErrors.map((validationError) => (
          <div>{validationError.message}</div>
        ))} */}
      {/* {user.isAuthenticated && <div>{`Hello ${user.email}`}</div>} */}
    </>
  );
};

export default Signup;
