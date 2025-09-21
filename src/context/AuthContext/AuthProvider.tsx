import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type IToken } from "./auth-context";
// import Loader from "@/components/common/Loader";
import { nodeApi } from "@/services/api";
import type { method } from "@/hooks/useAxios";
import useAxios from "@/hooks/useAxios";
import type { IUser } from "@/types/user.interface";

interface AuthContextProviderProp {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProviderProp) => {
  const [token, setToken] = useState<IToken | null>(null);
  // const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const { fetchData } = useAxios("node");

  // useEffect(() => {
  //   const tokenString = localStorage.getItem("token");
  //   if (tokenString) {
  //     const mytoken = JSON.parse(tokenString) as IToken;
  //     setToken(mytoken);
  //   }
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const loadUser = async () => {
      const params = {
        url: `${nodeApi.User}/${token?.user_id}`,
        method: "GET" as method,
      };
      const res = await fetchData(params);
      if (res?.status === 200) {
        setUser(res.data.result);
      }
    };
    loadUser();
  }, [token?.user_id, fetchData]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const params = {
          url: nodeApi.VerifyUser,
          method: "GET" as method,
        };
        const res = await fetchData(params);
        if (res?.status === 200) {
          setToken(res.data);
        }
      } catch (error) {
        console.log("Please login.", error);
      }
    };
    getUser();
  }, [fetchData]);

  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center h-[100vh]">
  //       <Loader size="40" color="black" />
  //     </div>
  //   );

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
