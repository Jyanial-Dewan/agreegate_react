import { createContext } from "react";

export interface AuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as AuthContext);
