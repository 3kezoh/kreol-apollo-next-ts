import { useApolloClient } from "@apollo/client";
import { popup } from "@utils";
import { useMeLazyQuery } from "generated/graphql";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { userInitialState } from "./initialState";

type Props = {
  children: ReactNode;
};

let google: Window | null = null;

export const AuthProvider = (props: Props) => {
  const [user, setUser] = useState(userInitialState);
  const [show, setShow] = useState(false);
  const apolloClient = useApolloClient();

  const open = () => setShow(true);
  const close = () => setShow(false);

  const [me] = useMeLazyQuery({
    fetchPolicy: "no-cache",
    onCompleted: (data) => setUser({ ...data?.me, isAuthenticated: !!data.me }),
  });

  useEffect(() => {
    me();
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, [me]);

  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const withGoogle = () => {
    if (google === null || google.closed) {
      google = popup("http://localhost:4000/auth/google", "_blank", 600, 600);
      const googleTimer = setInterval(() => {
        if (google?.closed) {
          me();
          clearInterval(googleTimer);
        }
      });
    } else {
      google.focus();
    }
  };

  const logout = useCallback(async () => {
    await fetch("http://localhost:4000/auth/logout", { credentials: "include" });
    apolloClient.resetStore();
    setUser(userInitialState);
  }, [apolloClient]);

  return (
    <AuthContext.Provider value={{ user, logout, withGoogle, show, open, close }} {...props} />
  );
};
