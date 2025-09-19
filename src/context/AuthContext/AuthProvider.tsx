import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type IToken } from "./auth-context";

interface AuthContextProviderProp {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProviderProp) => {
  const [token, setToken] = useState<IToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const mytoken = JSON.parse(tokenString) as IToken;
      setToken(mytoken);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
