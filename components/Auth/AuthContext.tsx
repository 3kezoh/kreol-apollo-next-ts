import { createContext } from "react";
import { userInitialState } from "./initialState";

type Context = {
  user: { isAuthenticated: boolean; id?: string; name?: string };
  logout?: () => Promise<void>;
  withGoogle?: () => void;
  show: boolean;
  open: () => void;
  close: () => void;
};

export const AuthContext = createContext<Context>({
  user: userInitialState,
  show: false,
  close: () => {},
  open: () => {},
});
