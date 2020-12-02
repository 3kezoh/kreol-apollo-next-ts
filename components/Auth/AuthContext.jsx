import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: { isAuthenticated: false, token: null },
  loading: false,
  error: null,
  login: () => new Promise(),
  signup: () => new Promise(),
  logout: () => new Promise(),
});

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
