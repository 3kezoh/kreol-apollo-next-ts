import { createContext } from "react";

const AuthContext = createContext({
  user: { id: null, name: null, isAuthenticated: false },
  loading: null,
  data: null,
  loginError: null,
  signupError: null,
  login: () => new Promise(),
  signup: () => new Promise(),
  logout: () => new Promise(),
  withGoogle: () => new Promise(),
});

export default AuthContext;
