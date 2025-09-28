import type {
  IClientInfo,
  IClientLocationInfo,
} from "@/types/deviceInfo.interface";
import type { IUser } from "@/types/user.interface";
import { createContext } from "react";

export interface GlobalContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  deviceInfo: IClientInfo | null;
  deviceLocation: IClientLocationInfo;
  setDeviceLocation: React.Dispatch<React.SetStateAction<IClientLocationInfo>>;
  setDeviceInfo: React.Dispatch<React.SetStateAction<IClientInfo | null>>;
  handleEmitClientLocation: () => void;
  handleSocketDisconnect: () => void;
}

export const GlobalContext = createContext({} as GlobalContext);
