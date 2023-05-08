import { IUser } from "@/types/User";
import React from "react";

export interface AuthContextProps {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  setUser: () => {},
});
