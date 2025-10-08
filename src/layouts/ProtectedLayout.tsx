import Header from "@/components/Header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router";

export const ProtectedLayout = () => {
  return (
    <div className="relative">
      <Header />
      <Sidebar />
      <div className="pt-[4rem] ml-72">
        <Outlet />
      </div>
    </div>
  );
};
