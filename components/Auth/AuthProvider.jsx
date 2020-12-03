import { useCallback, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import Cookie from "js-cookie";
import { AuthContext } from "./AuthContext";
import useSignup from "./useSignup";
import useLogin from "./useLogin";

const AuthProvider = (props) => {
  const [user, setUser] = useState({ isAuthenticated: false });
  const apolloClient = useApolloClient();

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) localStorage.setItem("token", token);
    Cookie.remove("token");
  }, []);

  const withGoogle = async () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const onLogin = ({ login: { token, user } }) => {
    setUser({ ...user, isAuthenticated: true });
    localStorage.setItem("token", token);
  };

  const onSignup = ({ signup: { token, user } }) => {
    setUser({ ...user, isAuthenticated: true });
    localStorage.setItem("token", token);
  };

  const onError = (error) => console.error(error);

  const [login, { loading: loginLoading, error: loginError }] = useLogin(onLogin, onError);

  const [signup, { loading: signupLoading, error: signupError }] = useSignup(onSignup, onError);

  const logout = useCallback(() => {
    apolloClient.resetStore();
    setUser({ isAuthenticated: false });
    localStorage.removeItem("token");
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loginLoading || signupLoading,
        error: loginError || signupError,
        login,
        signup,
        logout,
        withGoogle,
      }}
      {...props}
    />
  );
};

export default AuthProvider;
