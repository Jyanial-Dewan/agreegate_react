import { useAuthContext } from "@/context/AuthContext/useContext";
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

import { loadData, nodeURL } from "@/Utility/apiFuntion";

const SingleDevice = () => {
  const { token } = useAuthContext();
  const { device_id } = useParams();

  const [info, setInfo] = useState<IClientInfo | null>(null);
  const [locationInfos, setLocationInfos] = useState<IClientLocationInfo[]>([]);
  const [loading, setLoading] = useState(false);
  // const [loadingLocInfo, setLoadingLocInfo] = useState(false);

  console.log(loading);

  //Load Device Data
  useEffect(() => {
    const loadClients = async () => {
      const locationParams = {
        baseURL: nodeURL,
        url: `${nodeApi.ClientLocationInfo}?device_id=${device_id}&user_id=${token?.user_id}&page=1&limit=10`,
        setLoading: setLoading,
      };

      const locationRes = await loadData(locationParams);
      console.log(locationRes);
      if (locationRes?.status === 200) {
        setLocationInfos(locationRes.data.result);
      }

      const clientParams = {
        baseURL: nodeURL,
        url: `${nodeApi.ClientInfo}?user_id=${token?.user_id}&device_id=${device_id}`,
        setLoading: setLoading,
      };

      const clientRes = await loadData(clientParams);
      console.log(clientRes);
      if (clientRes?.status === 200) {
        setInfo(clientRes.data.result);
      }
    };

    loadClients();
  }, [token?.user_id, device_id]);

  return (
    <div className="p-4">
      {/* <div>
        <BackButton />
      </div> */}
      {/* <BackButton /> */}
      <Card className="max-h-[80vh] overflow-auto ">
        <CardHeader>
          <CardTitle>Client Info</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader size="40" color="black" />
            </div>
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
