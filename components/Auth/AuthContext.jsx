import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: { isAuthenticated: false, token: null },
  loading: null,
  data: null,
  error: null,
  login: () => new Promise(),
  signup: () => new Promise(),
  logout: () => new Promise(),
  withGoogle: () => new Promise(),
});

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
