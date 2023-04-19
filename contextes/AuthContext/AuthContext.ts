import React from "react";

export interface AuthContextProps {
  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  setUser: () => {},
});
