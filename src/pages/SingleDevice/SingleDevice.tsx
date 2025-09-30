import { useAuthContext } from "@/context/AuthContext/useContext";
import type { method } from "@/hooks/useAxios";
import useAxios from "@/hooks/useAxios";
import { nodeApi } from "@/services/api";
import type {
  IClientInfo,
  IClientLocationInfo,
} from "@/types/deviceInfo.interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationInfoTable from "./LocationInfoTable";
import Loader from "@/components/common/Loader";

const SingleDevice = () => {
  const { token } = useAuthContext();
  const { device_id } = useParams();
  const { fetchData } = useAxios("node");
  const [info, setInfo] = useState<IClientInfo | null>(null);
  const [locationInfos, setLocationInfos] = useState<IClientLocationInfo[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(loading);

  //Load Device Data
  useEffect(() => {
    const loadClients = async () => {
      const infoParams = {
        url: `${nodeApi.ClientInfo}?user_id=${token?.user_id}&device_id=${device_id}`,
        method: "GET" as method,
        setIsLoading: setLoading,
      };
      const res = await fetchData(infoParams);

      if (res?.status === 200) {
        setInfo(res.data.result);
      }

      const locationParams = {
        url: `${nodeApi.ClientLocationInfo}?device_id=${device_id}&user_id=${token?.user_id}&page=1&limit=10`,
        method: "GET" as method,
        setIsLoading: setLoading,
      };
      const locationRes = await fetchData(locationParams);

      if (locationRes?.status === 200) {
        setLocationInfos(locationRes?.data.result);
      }
    };
    loadClients();
  }, [token?.user_id, device_id, loading]);

  return (
    <div className="p-4">
      <Card className="max-h-[80vh] overflow-auto ">
        <CardHeader>
          <CardTitle>Client Info</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <Loader size="40" /> */}
          {loading ? (
            <Loader size="40" />
          ) : (
            <div className="flex gap-8 justify-between">
              <div className="max-w-[50%]">
                <p>IP Address: {info?.ip_address}</p>
                <p>IP Organization: {info?.ip_org}</p>
                <p>Region: {info?.region_name}</p>
                <p>City: {info?.city}</p>
                <p>Country: {info?.country}</p>
                <p>Country Code: {info?.country_code}</p>
                <p>ZIP: {info?.zip}</p>
                <p>Time Zone: {info?.timezone}</p>
                <p>IP License: {info?.autonomus_system}</p>
                <p>User Agent: {info?.user_agent}</p>
                <p>Browser Name: {info?.browser_name}</p>
                <p>Browser Type: {info?.browser_type}</p>
                <p>Browser Version: {info?.browser_version}</p>
                <p>CPU Architecture: {info?.cpu_architecture}</p>
                <p>Device Model: {info?.device_model}</p>
                <p>Device Type: {info?.device_type}</p>
                <p>Device Vendor: {info?.device_vendor}</p>
                <p>Engine Name: {info?.engine_name}</p>
                <p>Engine Version: {info?.engine_version}</p>
                <p>Operating System Name: {info?.os_name}</p>
                <p>Operating System Version: {info?.os_version}</p>
              </div>
              {locationInfos && (
                <div className="flex flex-col gap-4">
                  <p>Last Login Location</p>
                  <iframe
                    src={`https://www.google.com/maps?q=${locationInfos[0]?.latitude},${locationInfos[0]?.longitude}&z=15&output=embed`}
                    width="300"
                    height="300"
                    style={{ border: 1 }}
                    allowFullScreen
                  ></iframe>
                  <LocationInfoTable locationInfos={locationInfos} />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleDevice;
