import type { method } from "@/hooks/useAxios";
import useAxios from "@/hooks/useAxios";
import { nodeApi } from "@/services/api";
import type { IUser } from "@/types/user.interface";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { GlobalContext } from "./global-context";
import { useAuthContext } from "../AuthContext/useContext";
import type {
  IClientInfo,
  IClientLocationInfo,
} from "@/types/deviceInfo.interface";

import * as UAParser from "ua-parser-js";
import { io } from "socket.io-client";

interface GlobalContextProviderProp {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalContextProviderProp) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<IClientInfo | null>(null);
  const [deviceLocation, setDeviceLocation] = useState<IClientLocationInfo>({
    connection_id: "",
    latitude: 0,
    longitude: 0,
  });
  const { token } = useAuthContext();

  const socket_url = import.meta.env.VITE_SOCKET_URL;
  // Memoize the socket connection so that it's created only once
  const socket = useMemo(() => {
    return io(socket_url, {
      path: "/socket.io/",
      query: {
        user_id: token?.user_id,
        device_id: deviceInfo?.device_id,
      },
      transports: ["websocket"],
    });
  }, [socket_url, token?.user_id, deviceInfo?.device_id]);
  const { fetchData } = useAxios("node");

  useEffect(() => {
    if (!token || token.isLoggedIn === false) return;

    const loadUser = async () => {
      const params = {
        url: `${nodeApi.User}?user_id=${token.user_id}`,
        method: "GET" as method,
      };
      const res = await fetchData(params);
      if (res?.status === 200) {
        setUser(res.data.result);
      }
    };
    loadUser();
  }, [fetchData, token]);

  useEffect(() => {
    const fetchIP = async () => {
      const params = {
        url: nodeApi.IPAdress,
        method: "GET" as method,
      };
      const res = await fetchData(params);

      if (res?.status === 200) {
        const result = res.data;
        setDeviceInfo((prev) => ({
          ...prev,
          country: result.country,
          country_code: result.countryCode,
          region: result.region,
          region_name: result.regionName,
          city: result.city,
          zip: result.zip,
          timezone: result.timezone,
          ip_org: result.org,
          ip_address: result.query,
          autonomus_system: result.as,
        }));
      }
    };
    fetchIP();
  }, [fetchData]);

  useEffect(() => {
    const parser = new UAParser.UAParser();
    const result = parser.getResult();
    if (result) {
      setDeviceInfo((prev) => ({
        ...prev,
        browser_name: result.browser.name,
        browser_version: result.browser.version,
        browser_type: result.browser.type,
        cpu_architecture: result.cpu.architecture,
        engine_name: result.engine.name,
        engine_version: result.engine.version,
        os_name: result.os.name,
        os_version: result.os.version,
        user_agent: result.ua,
      }));
    }
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        console.log("IP Info:", data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const storedValue = localStorage.getItem("ClientInfo");
    if (storedValue) {
      const parsed: IClientInfo = JSON.parse(storedValue);
      setDeviceInfo(parsed);
    }
  }, []);

  const handleEmitClientLocation = () => {
    socket.emit("ClientLocation", {
      ...deviceLocation,
      device_id: deviceInfo?.device_id,
      user_id: token?.user_id,
    });
  };

  const handleSocketDisconnect = () => {
    socket.disconnect();
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        deviceInfo,
        deviceLocation,
        setDeviceLocation,

        setDeviceInfo,
        handleEmitClientLocation,
        handleSocketDisconnect,

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
