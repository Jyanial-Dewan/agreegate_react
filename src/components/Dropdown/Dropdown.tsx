import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router";
import { LockKeyholeOpen, LogOut, User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext/useContext";
import useAxios, { type method } from "@/hooks/useAxios";
import { nodeApi } from "@/services/api";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
// import axios from "axios";

const Dropdown = () => {
  const { setToken, token } = useAuthContext();
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const { fetchData } = useAxios("node");
  const params = {
    url: nodeApi.Logout,
    method: "POST" as method,
    data: {},
  };
  const logOut = async () => {
    const res = await fetchData(params);
    if (res?.status === 200) {
      setToken(null);
      navigate("/login");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="border cursor-pointer">
          <AvatarImage
            className="object-cover object-center"
            src={`http://localhost:3000/api/${user?.profile_picture.original}`}
          />
          <AvatarFallback>{token?.user_name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-1">
        <DropdownMenuLabel className=" font-bold font-workSans text-lg text-center">
          {user?.user_name}
        </DropdownMenuLabel>
        <div className="p-2 rounded hover:bg-hover text-sm">
          <NavLink
            to="/update-profile"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center w-full text-blue-500"
                : "flex gap-2 items-center w-full"
            }
          >
            <User size={18} />
            <p className="font-semibold font-workSans text-md">
              Update Profile
            </p>
          </NavLink>
          <NavLink
            to="/change-password"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center w-full text-blue-500"
                : "flex gap-2 items-center w-full"
            }
          >
            <LockKeyholeOpen size={18} />
            <p className="font-semibold font-workSans text-md mt-2">
              Change Password
            </p>
          </NavLink>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2 rounded hover:bg-hover text-sm ">
          <button
            onClick={logOut}
            className="flex gap-2 items-center w-full text-red-600 cursor-pointer"
          >
            <LogOut size={18} />
            <p className="font-semibold font-workSans text-md">Logout</p>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
