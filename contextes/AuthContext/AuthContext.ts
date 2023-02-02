import React from "react";

export interface AuthContextProps {
  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
  onClickLogOut: () => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  setUser: () => {},
  onClickLogOut: () => {},
});
