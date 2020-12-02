import { useCallback, useReducer } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { AuthContext } from "./authContext";
import { LOGIN, SIGNUP } from "../../graphql/auth/mutations";

const initialState = {
  user: { isAuthenticated: false, token: null },
  loading: false,
  error: null,
};

const reducer = (_state, { type, payload }) => {
  switch (type) {
    case "error":
      return {
        user: { isAuthenticated: false, token: null },
        loading: false,
        error: payload.error,
      };
    case "loading":
      return {
        user: { isAuthenticated: false, token: null },
        loading: true,
        error: null,
      };
    case "login":
      return {
        user: { ...payload.user, isAuthenticated: true, token: payload.token },
        loading: false,
        error: null,
      };
    case "signup":
      return {
        user: { ...payload.user, isAuthenticated: true, token: payload.token },
        loading: false,
        error: null,
      };
    case "logout":
      return {
        user: { isAuthenticated: false, token: null },
        loading: false,
        error: null,
      };
    default:
      throw new Error();
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [_login] = useMutation(LOGIN);
  const [_signup] = useMutation(SIGNUP);
  const client = useApolloClient();

  const login = useCallback(async (email, password) => {
    try {
      dispatch({ type: "loading" });
      const { data } = await _login({ variables: { email, password } });
      const { token, user } = data.login;
      if (token) {
        dispatch({ type: "login", payload: { user, token } });
        localStorage.setItem("token", token);
      }
    } catch (error) {
      dispatch({ type: "error", payload: { error } });
    }
  });

  const signup = useCallback(async (email, password) => {
    try {
      dispatch({ type: "loading" });
      const { data } = await _signup({ variables: { email, password } });
      const { token, user } = data.signup;
      if (token) {
        dispatch({ type: "signup", payload: { user, token } });
        localStorage.setItem("token", token);
      }
    } catch (error) {
      dispatch({ type: "error", payload: { error } });
    }
  });

  const logout = useCallback(() => {
    client.resetStore();
    localStorage.removeItem("token");
  });

  const { loading, error, user } = state;

  return (
    <AuthContext.Provider value={{ loading, error, user, login, signup, logout }} {...props} />
  );
};

export default AuthProvider;
