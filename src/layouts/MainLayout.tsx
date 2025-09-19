import { Navigate, useLocation } from "react-router";
import { ProtectedLayout } from "./ProtectedLayout";
import { useAuthContext } from "@/context/AuthContext/useContext";

const MainLayout = () => {
  const { token } = useAuthContext();
  const location = useLocation();

  if (!token || !token.isLoggedIn || !token.access_token) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  return <ProtectedLayout />;
};

export default MainLayout;
