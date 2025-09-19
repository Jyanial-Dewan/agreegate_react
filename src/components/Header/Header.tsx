// import logo from "@/Image/logo-2.png";
import { NavLink } from "react-router";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-[4rem] w-full px-[12px] bg-white shadow-md fixed z-40 ">
      <div className="flex gap-2 items-center">
        {/* <Link to="/">
          <img src={logo} alt="logo" className="h-[2rem] w-auto" />
        </Link> */}
        <p className="font-semibold">Aggregate React</p>
      </div>

      <div className="flex gap-1 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-winter-100 px-2 py-2 rounded-md flex gap-2 items-center hover:bg-hover"
              : "px-2 py-2 rounded-md flex gap-2 items-center hover:bg-hover"
          }
        >
          <p className="font-semibold hidden lg:block transition duration-300 ease-in-out">
            Home
          </p>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-winter-100 px-2 py-2 rounded-md flex gap-2 items-center hover:bg-hover"
              : "px-2 py-2 rounded-md flex gap-2 items-center hover:bg-hover"
          }
        >
          <p className="font-semibold hidden lg:block transition duration-300 ease-in-out">
            About
          </p>
        </NavLink>

        {/* <Dropdown /> */}
      </div>
      <Dropdown />
    </div>
  );
};

export default Header;
