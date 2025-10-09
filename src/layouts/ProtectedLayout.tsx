// import Header from "@/components/Header/Header";`
import Sidebar from "@/components/sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { Outlet } from "react-router";

export const ProtectedLayout = () => {
  const { user } = useGlobalContext();
  return (
    <div className="bg-body-color h-screen">
      {/* <Header /> */}

      <div className="flex justify-between">
        <Sidebar />
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <Avatar className="border cursor-pointer">
            <AvatarImage
              className="object-cover object-center"
              src={`http://localhost:3000/api/${user?.profile_picture.original}`}
            />
            <AvatarFallback>{user?.first_name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <p>
            {user?.first_name} {user?.last_name}
          </p>
        </div>
      </div>
      <div className="pt-[4rem] ml-72">
        <Outlet />
      </div>
    </div>
  );
};
