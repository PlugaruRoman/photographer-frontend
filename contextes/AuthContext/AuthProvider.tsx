import React from "react";

import { AuthContext } from "./AuthContext";
import { User } from "@/types/User";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User>();

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
