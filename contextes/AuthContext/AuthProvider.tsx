import React from "react";

import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<string>();

  React.useEffect(() => {
    const name = localStorage.getItem("user");
    if (name) {
      setUser(name);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );
  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
