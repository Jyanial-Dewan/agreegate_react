import { Navigate, useLocation } from "react-router";
import { ProtectedLayout } from "./ProtectedLayout";
import { useAuthContext } from "@/context/AuthContext/useContext";

const MainLayout = () => {
  const { token } = useAuthContext();
  const location = useLocation();

  if (!token || !token.isLoggedIn || !token.access_token) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return <ProtectedLayout />;
};

export default MainLayout;
