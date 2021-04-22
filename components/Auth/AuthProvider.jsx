import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import AuthContext from "./AuthContext";
import useSignup from "./useSignup";
import useLogin from "./useLogin";

const AuthProvider = (props) => {
  const [user, setUser] = useState({ id: null, name: null, isAuthenticated: false });
  const router = useRouter();
  const apolloClient = useApolloClient();

  useEffect(() => {
    console.log("Checking cookie");
    const token = Cookie.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setUser({ isAuthenticated: true });
    }
  }, []);

  useEffect(() => {
    console.log("Checking localStorage");
    const token = localStorage.getItem("token");
    if (token) {
      const { sub: id, name } = jwt.decode(token);
      setUser({ id, name, isAuthenticated: true });
    }
  }, []);

  const withGoogle = async () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const onLogin = ({ login: { token, user } }) => {
    setUser({ ...user, isAuthenticated: true });
    localStorage.setItem("token", token);
    Cookie.set("token", token);
    router.push("/");
  };

  const onSignup = ({ signup: { token, user } }) => {
    setUser({ ...user, isAuthenticated: true });
    localStorage.setItem("token", token);
    Cookie.set("token", token);
    router.push("/");
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
        loginError,
        signupError,
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
