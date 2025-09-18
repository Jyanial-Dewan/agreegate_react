import { useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";

interface AuthContextProviderProp {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProviderProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
