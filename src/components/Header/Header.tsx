// import logo from "@/Image/logo-2.png";
import { NavLink } from "react-router";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-[3rem] w-full px-[12px] bg-white shadow-md fixed z-40 ">
      <div className="flex gap-5 items-center">
        {/* <Link to="/">
          <img src={logo} alt="logo" className="h-[2rem] w-auto" />
        </Link> */}
        <p className="font-semibold">Aggregate</p>
        <div className="flex items-center">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 px-2 py-3 flex gap-2 items-center hover:border-b-2 hover:border-blue-400"
                : "px-2 py-3 flex gap-2 items-center hover:border-b-2 hover:border-blue-400"
            }
          >
            <p className="font-semibold hidden lg:block transition duration-300 ease-in-out">
              Home
            </p>
          </NavLink>
          <NavLink
            to="/About"
            className={({ isActive }) =>
              isActive
                ? "bg-winter-100 px-2 py-2 rounded-md flex gap-2 items-center hover:bg-hover"
                : "px-2 py-3 flex gap-2 items-center hover:border-b-2 hover:border-blue-400"
            }
          >
            <p className="font-semibold hidden lg:block transition duration-300 ease-in-out">
              About
            </p>
          </NavLink>
        </div>
      </div>

      <Dropdown />
    </div>
  );
};

export default Header;
