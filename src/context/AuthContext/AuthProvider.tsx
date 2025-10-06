import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type IToken } from "./auth-context";
import { nodeApi } from "@/services/api";
import { loadData, nodeURL } from "@/Utility/apiFuntion";

interface AuthContextProviderProp {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProviderProp) => {
  const [token, setToken] = useState<IToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const params = {
        baseURL: nodeURL,
        url: nodeApi.VerifyUser,
        setLoading: setLoading,
      };
      const res = await loadData(params);
      if (res?.status === 200) {
        setToken(res.data);
        setLoading(false);
      }
      setLoading(false);
    };
    const delay = setTimeout(() => {
      verifyUser();
    }, 300);

    return () => clearTimeout(delay);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
