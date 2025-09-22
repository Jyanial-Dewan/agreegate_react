import type { method } from "@/hooks/useAxios";
import useAxios from "@/hooks/useAxios";
import { nodeApi } from "@/services/api";
import type { IUser } from "@/types/user.interface";
import { useEffect, useState, type ReactNode } from "react";
import { GlobalContext } from "./global-context";
import { useAuthContext } from "../AuthContext/useContext";
import type { IDevice, IDeviceLocation } from "@/types/deviceInfo.interface";

import * as UAParser from "ua-parser-js";

interface GlobalContextProviderProp {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalContextProviderProp) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<IDevice | null>(null);
  const [deviceLocation, setDeviceLocation] = useState<IDeviceLocation>({
    latitude: 0,
    longitude: 0,
  });
  const { fetchData } = useAxios("node");
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token || token.isLoggedIn === false) return;
    const loadUser = async () => {
      const params = {
        url: `${nodeApi.User}/${token?.user_id}`,
        method: "GET" as method,
      };
      const res = await fetchData(params);
      if (res?.status === 200) {
        setUser(res.data.result);
      }
    };
    loadUser();
  }, [token, fetchData]);

  useEffect(() => {
    const fetchIP = async () => {
      const params = {
        url: nodeApi.IPAdress,
        method: "GET" as method,
      };
      const res = await fetchData(params);
      console.log(res);

      if (res?.status === 200) {
        const result = res.data;
        setDeviceInfo((prev) => ({
          ...prev,
          country: result.country,
          countryCode: result.countryCode,
          region: result.region,
          regionName: result.regionName,
          city: result.city,
          zip: result.zip,
          timezone: result.timezone,
          ipOrg: result.org,
          ipAddress: result.query,
          autonomusSystem: result.as,
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
        browserName: result.browser.name,
        browserVersion: result.browser.version,
        browserType: result.browser.type,
        cpuArchitecture: result.cpu.architecture,
        engineName: result.engine.name,
        engineVersion: result.engine.version,
        osName: result.os.name,
        osVersion: result.os.version,
        userAgent: result.ua,
      }));
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, deviceInfo, deviceLocation, setDeviceLocation }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
