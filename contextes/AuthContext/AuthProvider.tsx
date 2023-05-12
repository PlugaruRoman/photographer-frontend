import React from "react";

import { AuthContext } from "./AuthContext";
import { IUser } from "@/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
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
