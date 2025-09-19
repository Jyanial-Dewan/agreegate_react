import Header from "@/components/Header/Header";
import { Outlet } from "react-router";

export const ProtectedLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      ProtectedLayout
    </div>
  );
};
