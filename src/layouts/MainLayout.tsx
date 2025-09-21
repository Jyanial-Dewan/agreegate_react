import { Navigate, useLocation } from "react-router";
import { ProtectedLayout } from "./ProtectedLayout";
import { useAuthContext } from "@/context/AuthContext/useContext";
import Loader from "@/components/common/Loader";

const MainLayout = () => {
  const { token, loading } = useAuthContext();
  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader size="40" color="black" />
      </div>
    );

  if (!token) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return <ProtectedLayout />;
};

export default MainLayout;
