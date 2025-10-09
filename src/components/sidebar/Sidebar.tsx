import { useAuthContext } from "@/context/AuthContext/useContext";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { nodeApi } from "@/services/api";
import { nodeURL, postData } from "@/Utility/apiFuntion";
import {
  FileChartColumnIncreasing,
  Laptop,
  LockKeyholeOpen,
  LogOut,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";

const Sidebar = () => {
  const { setToken } = useAuthContext();

  const { handleSocketDisconnect } = useGlobalContext();

  const navigate = useNavigate();

  const params = {
    baseURL: nodeURL,
    url: nodeApi.Logout,
    // setLoading?: Dispatch<SetStateAction<boolean>>;
    payload: {},
  };
  const logOut = async () => {
    const res = await postData(params);
    if (res?.status === 200) {
      setToken(null);
      localStorage.removeItem("ClientInfo");
      navigate("/login");
      handleSocketDisconnect();
    }
  };
  return (
    <div className="absolute z-50 px-6 min-h-screen w-[276px] bg-client-secondary flex flex-col justify-between">
      <div>
        <h2 className="text-3xl text-center py-6 font-bold">LOGO HERE</h2>
        <h5 className="font-normal uppercase">Main Menu</h5>
        <hr className="bg-white my-3 h-0.5" />
        <div className="flex flex-col gap-3">
          <NavLink
            to="/my-devices"
            className={({ isActive }) =>
              isActive
                ? "rounded-full flex gap-2.5 items-center p-1.5 bg-[linear-gradient(90deg,#1C3BA4_0%,#00B4ED_122.37%)]"
                : "flex gap-2.5 items-center w-full"
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? "rounded-full p-2 bg-white" : ""}>
                  <Laptop size={24} color={isActive ? "#0039A3" : "black"} />
                </span>
                <span
                  className={` ${
                    isActive ? "text-[18px] font-semibold text-white" : ""
                  } `}
                >
                  My Device
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/update-profile"
            className={({ isActive }) =>
              isActive
                ? "rounded-full flex gap-2.5 items-center p-1.5 bg-[linear-gradient(90deg,#1C3BA4_0%,#00B4ED_122.37%)]"
                : "flex gap-2.5 items-center w-full"
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? "rounded-full p-2 bg-white" : ""}>
                  <User size={24} color={isActive ? "#0039A3" : "black"} />
                </span>
                <span
                  className={` ${
                    isActive ? "text-[18px] font-semibold text-white" : ""
                  } `}
                >
                  Update Profile
                </span>
              </>
            )}
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
          <NavLink
            to="/change-password"
            className={({ isActive }) =>
              isActive
                ? "rounded-full flex gap-2.5 items-center p-1.5 bg-[linear-gradient(90deg,#1C3BA4_0%,#00B4ED_122.37%)]"
                : "flex gap-2.5 items-center w-full"
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? "rounded-full p-2 bg-white" : ""}>
                  <LockKeyholeOpen
                    size={24}
                    color={isActive ? "#0039A3" : "black"}
                  />
                </span>
                <span
                  className={` ${
                    isActive ? "text-[18px] font-semibold text-white" : ""
                  } `}
                >
                  Change Password
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>
      <div className="p-2 mb-4 rounded hover:bg-hover text-sm ">
        <hr className="bg-white my-3 h-0.5" />
        <button
          onClick={logOut}
          className="flex gap-2 items-center w-full text-red-600 cursor-pointer"
        >
          <LogOut size={18} />
          <p className="font-semibold font-workSans text-md">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
