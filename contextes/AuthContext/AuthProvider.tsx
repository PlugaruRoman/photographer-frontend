import React from "react";

import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<string>();

  const onClickLogOut = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    setUser(undefined);
  };

  React.useEffect(() => {
    const name = localStorage.getItem("user");
    if (name) {
      setUser(JSON.parse(name).identifier);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      setUser,
      onClickLogOut,
    }),
    [user, setUser]
  );
  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
