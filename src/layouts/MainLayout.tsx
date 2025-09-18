import { Navigate, useLocation } from "react-router";
import { ProtectedLayout } from "./ProtectedLayout";
import { useAuthContext } from "@/context/AuthContext/useContext";

const MainLayout = () => {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();
  if (!isLoggedIn) return <Navigate state={location.pathname} to={"/login"} />;
  return <ProtectedLayout />;
};

export default MainLayout;
