// import logo from "@/Image/logo-2.png";
// import { NavLink } from "react-router";
import { Link } from "react-router";
import HeaderDropdown from "./HeaderDropdow";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-[3rem] w-full px-[12px] fixed z-40 ">
      <div className="flex gap-5 items-center">
        <Link to="/" className="cursor-pointer">
          <p className="font-semibold">Aggregate</p>
          {/* <img src={logo} alt="logo" className="h-[2rem] w-auto" /> */}
        </Link>
      </div>

      <div className="flex gap-1 items-center">
        {/* <NavLink
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
        </NavLink> */}

        {/* <Dropdown /> */}
      </div>

      <HeaderDropdown />
    </div>
  );
};

export default Header;
