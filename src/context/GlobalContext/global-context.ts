import type { IDevice, IDeviceLocation } from "@/types/deviceInfo.interface";
import type { IUser } from "@/types/user.interface";
import { createContext } from "react";

export interface GlobalContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  deviceInfo: IDevice | null;
  deviceLocation: IDeviceLocation;
  setDeviceLocation: React.Dispatch<React.SetStateAction<IDeviceLocation>>;
}

export const GlobalContext = createContext({} as GlobalContext);
