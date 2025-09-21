import { useAuthContext } from "@/context/AuthContext/useContext";
// import { nodeApi } from "@/services/api";
import { toast } from "sonner";
import axios from "axios";

const useRefreshToken = () => {
  const { setToken } = useAuthContext();

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:3000/login/refresh-token");

      if (!res) {
        await axios.get("http://localhost:3000/logout");

        toast("Please login again", { duration: 2000 });
        setToken(null);
        // setTimeout(() => {
        //   window.location.href = "/login";
        // }, 2000);
        return;
      }
      setToken(res.data);
      return res.data.access_token;
    } catch (error) {
      console.log(error, "Refresh token invalid or expired.");
      return;
    }
  };
  return refreshToken;
};
export default useRefreshToken;
