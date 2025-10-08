import {
  ChartColumn,
  FileChartColumnIncreasing,
  MessageCircleMore,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <div className="absolute z-50 px-6 min-h-screen w-[276px] bg-client-secondary">
      <h2 className="text-3xl text-center py-6 font-bold">LOGO HERE</h2>
      <h5 className="font-normal uppercase">Main Menu</h5>
      <hr className="bg-white my-3 h-0.5" />
      <div className="flex flex-col gap-3">
        <NavLink to={""}>
          <div className="rounded-full flex gap-2.5 items-center p-1.5 bg-[linear-gradient(90deg,#1C3BA4_0%,#00B4ED_122.37%)]">
            <span className="rounded-full p-2 bg-white">
              <ChartColumn size={24} color="#0039A3" />
            </span>
            <span className="text-[18px] font-semibold text-white">
              Dashboard
            </span>
          </div>
        </NavLink>
        <NavLink to={""}>
          <div className="flex gap-2.5 items-center p-1.5">
            <MessageCircleMore size={24} />
            <span className="text-base  font-normal">Menu 1</span>
          </div>
        </NavLink>
        <NavLink to={""}>
          <div className="flex gap-2.5 items-center p-1.5">
            <FileChartColumnIncreasing size={24} />
            <span className="text-base  font-normal">Appointments</span>
          </div>
        </NavLink>
        <NavLink to={""}>
          <div className="flex gap-2.5 items-center p-1.5">
            <Settings size={24} />
            <span className="text-base  font-normal">Profile</span>
          </div>
        </NavLink>
      </div>
      <div className="my-3">
        <h5 className="font-normal uppercase">General</h5>
        <hr className="bg-white mt-3 h-0.5" />
      </div>
      <div className="flex flex-col gap-3">
        <NavLink to={""}>
          <div className="flex gap-2.5 items-center p-1.5">
            <FileChartColumnIncreasing size={24} />
            <span className="text-base  font-normal">Appointments</span>
          </div>
        </NavLink>
        <NavLink to={""}>
          <div className="flex gap-2.5 items-center p-1.5">
            <Settings size={24} />
            <span className="text-base  font-normal">Profile</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
