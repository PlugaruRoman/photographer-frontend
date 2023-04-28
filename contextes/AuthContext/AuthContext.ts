import { User } from "@/types/User";
import React from "react";

export interface AuthContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  setUser: () => {},
});
