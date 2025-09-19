import type { IUser } from "@/types/user.interface";
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
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const AuthContext = createContext({} as AuthContext);
