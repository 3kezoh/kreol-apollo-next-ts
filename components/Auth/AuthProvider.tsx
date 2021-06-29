import { useApolloClient, useQuery } from "@apollo/client";
import { useMeQuery } from "generated/graphql";
import { ReactNode } from "react";
import { useCallback, useState } from "react";
import { AuthContext } from "./AuthContext";
import { userInitialState } from "./initialState";

type Props = {
  children: ReactNode;
};

export const AuthProvider = (props: Props) => {
  const [user, setUser] = useState(userInitialState);
  const apolloClient = useApolloClient();

  useMeQuery({
    fetchPolicy: "no-cache",
    onCompleted: (data) => setUser({ ...data?.me, isAuthenticated: !!data.me }),
  });

  const withGoogle = async () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const logout = useCallback(async () => {
    await fetch("http://localhost:4000/auth/logout", { credentials: "include" });
    apolloClient.resetStore();
    setUser(userInitialState);
  }, [apolloClient]);

  return <AuthContext.Provider value={{ user, logout, withGoogle }} {...props} />;
};
