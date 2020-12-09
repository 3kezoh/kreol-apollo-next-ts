import { createContext } from "react";

const AuthContext = createContext({
  user: { isAuthenticated: false },
  loading: null,
  data: null,
  error: null,
  login: () => new Promise(),
  signup: () => new Promise(),
  logout: () => new Promise(),
  withGoogle: () => new Promise(),
});

export default AuthContext;
