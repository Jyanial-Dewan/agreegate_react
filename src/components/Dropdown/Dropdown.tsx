import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router";
import { LogOut, User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext/useContext";

const Dropdown = () => {
  const { setToken, user } = useAuthContext();
  const navigate = useNavigate();
  const logOut = async () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="border">
          <AvatarImage
            className="object-cover object-center"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
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
                ? "flex gap-2 items-center w-full text-active"
                : "flex gap-2 items-center w-full"
            }
          >
            <User size={18} />
            <p className="font-semibold font-workSans text-md">
              Update Profile
            </p>
          </NavLink>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2 rounded hover:bg-hover text-sm">
          <button
            onClick={logOut}
            className="flex gap-2 items-center w-full text-Red-300"
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
