import { createContext } from "react";

export interface IToken {
  isLoggedIn: boolean;
  user_id: number;
  access_token: string;
  refresh_token: string;
  issuedAt: string;
}

export interface AuthContext {
  token: IToken | null;
  setToken: React.Dispatch<React.SetStateAction<IToken | null>>;
}

export const AuthContext = createContext({} as AuthContext);
