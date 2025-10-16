// import Header from "@/components/Header/Header";`
import Sidebar from "@/components/sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { pathToTitle } from "@/Utility/common";
import { Outlet, useLocation } from "react-router";

export const ProtectedLayout = () => {
  const { user } = useGlobalContext();
  const location = useLocation();
  return (
    <div className="bg-body-color">
      {/* <Header /> */}

      <Sidebar />
      <div className="ml-[220Px] p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            {pathToTitle(location.pathname)}
          </h2>
        </div>
        <div className=" flex items-center gap-2">
          <Avatar className="border cursor-pointer">
            <AvatarImage
              className="object-cover object-center"
              src={`http://localhost:3000/api/${user?.profile_picture?.original}`}
            />
            <AvatarFallback className="capitalize text-base">
              {user?.first_name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <p className="capitalize">
            {user?.first_name} {user?.last_name}
          </p>
        </div>
      </div>

      <div className="p-4 ml-[220Px]">
        <Outlet />
      </div>
    </div>
  );
};
