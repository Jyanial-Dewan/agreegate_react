import { useAuthContext } from "@/context/AuthContext/useContext";
import { nodeApi } from "@/services/api";
import type {
  IClientInfo,
  IClientLocationInfo,
} from "@/types/deviceInfo.interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Loader from "@/components/common/Loader";

import { loadData, nodeURL } from "@/Utility/apiFuntion";
import {
  CircleAlert,
  GlobeLock,
  LaptopMinimal,
  MapPin,
  MapPinned,
  MonitorCog,
} from "lucide-react";
import LocationInfoTable from "./LocationInfoTable";

const SingleDevice = () => {
  const { token } = useAuthContext();
  const { device_id } = useParams();

  const [info, setInfo] = useState<IClientInfo | null>(null);
  const [locationInfos, setLocationInfos] = useState<IClientLocationInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLocationInfoLoading, setIsLocationInfoLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumbers, setTotalPageNumbers] = useState(1);

  //Load Client Info Data
  useEffect(() => {
    const loadClients = async () => {
      const clientParams = {
        baseURL: nodeURL,
        url: `${nodeApi.ClientInfo}?user_id=${token?.user_id}&device_id=${device_id}`,
        setLoading: setLoading,
      };

      const clientRes = await loadData(clientParams);
      if (clientRes?.status === 200) {
        setInfo(clientRes.data.result);
      }
    };

    loadClients();
  }, [token?.user_id, device_id]);

  /**Load location info data */
  useEffect(() => {
    const loadLocationInfo = async () => {
      const locationParams = {
        baseURL: nodeURL,
        url: `${nodeApi.ClientLocationInfo}?device_id=${device_id}&user_id=${token?.user_id}&page=${currentPage}&limit=10`,
        setLoading: setIsLocationInfoLoading,
      };

      const locationRes = await loadData(locationParams);

      if (locationRes?.status === 200) {
        setLocationInfos(locationRes.data.result);
        setTotalPageNumbers(locationRes.data.totalPages);
      }
    };

    loadLocationInfo();
  }, [token?.user_id, device_id, currentPage]);

  return (
    <div>
      {/* <div>
        <BackButton />
      </div> */}
      {/* <BackButton /> */}
      <div>
        <h3 className="font-bold my-3">Client Information</h3>
        <div>
          {/* {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader size="40" color="black" />
            </div>
          ) : ( */}
          <div className="flex gap-4">
            <div className="w-[calc(100%-300px)] flex flex-col gap-4">
              {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Loader size="40" color="black" />
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 bg-white border p-4 rounded-lg">
                    <div className="bg-client-secondary rounded-lg p-3 w-[300px] flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <GlobeLock size={18} color="blue" />
                        <p className="text-[14px] font-medium text-client-primary">
                          Network Information
                        </p>
                      </div>
                      <p className="text-xs font-normal text-gray-500">
                        IP Address
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.ip_address}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Organization
                      </p>
                      <p className="text-[14px] font-medium">{info?.ip_org}</p>
                      <p className="text-xs font-normal text-gray-500">
                        License
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.autonomus_system}
                      </p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 w-[300px] flex-grow">
                      <div className="flex items-center gap-2  mb-2">
                        <MonitorCog size={18} color="#f59e0b" />
                        <p className="text-[14px] font-medium text-amber-400">
                          Operating System & Engine
                        </p>
                      </div>
                      <p className="text-xs font-normal text-gray-500">
                        OS Name
                      </p>
                      <p className="text-[14px] font-medium">{info?.os_name}</p>
                      <p className="text-xs font-normal text-gray-500">
                        OS Version
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.os_version}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Engine Name
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.engine_name}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Engine Version
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.engine_version}
                      </p>
                    </div>
                    <div className="bg-GREEN-100 rounded-lg p-3 w-[300px] flex-grow">
                      <div className="flex items-center gap-2  mb-2">
                        <MapPin size={18} color="green" />
                        <p className="text-[14px] font-medium text-GREEN-400">
                          Location Details
                        </p>
                      </div>
                      <p className="text-xs font-normal text-gray-500">
                        Country
                      </p>
                      <p className="text-[14px] font-medium">{info?.country}</p>
                      <p className="text-xs font-normal text-gray-500">
                        Country Code
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.country_code}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Region
                      </p>
                      <p className="text-[14px] font-medium">{info?.region}</p>
                      <p className="text-xs font-normal text-gray-500">
                        Region Name
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.region_name}
                      </p>
                      <p className="text-xs font-normal text-gray-500">City</p>
                      <p className="text-[14px] font-medium">{info?.city}</p>
                      <p className="text-xs font-normal text-gray-500">
                        Time Zone
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.timezone}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        ZIP Code
                      </p>
                      <p className="text-[14px] font-medium">{info?.zip}</p>
                    </div>
                    <div className="bg-PURPLE-100 rounded-lg p-3 w-[300px] flex-grow">
                      <div className="flex items-center gap-2  mb-2">
                        <LaptopMinimal size={18} color="purple" />
                        <p className="text-[14px] font-medium text-PURPLE-400">
                          Device & Browser
                        </p>
                      </div>
                      <p className="text-xs font-normal text-gray-500">
                        Browser Name
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.browser_name}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Browser Type
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.browser_type}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Browser Version
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.browser_version}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Device Type
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.device_type}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Device Model
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.device_model}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Device Vendor
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.device_vendor}
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        CPU Architecture
                      </p>
                      <p className="text-[14px] font-medium">
                        {info?.cpu_architecture}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 bg-white border p-4 rounded-lg">
                    <div className="flex font-bold gap-2">
                      <CircleAlert />
                      <h2>User Agent Details</h2>
                    </div>
                    <div className="bg-gray-300 w-full h-[0.5px]"></div>
                    <div className="bg-gray-100 text-gray-700 text-sm rounded-lg p-3">
                      <p>{info?.user_agent}</p>
                    </div>
                  </div>
                </>
              )}

              <div className="bg-white border p-4 rounded-lg">
                <LocationInfoTable
                  locationInfos={locationInfos}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPageNumbers={totalPageNumbers}
                  isLoading={isLocationInfoLoading}
                />
              </div>
            </div>
            {locationInfos && (
              <div className="flex flex-col gap-4 p-3 bg-white rounded-lg border w-[300px] h-[400px]">
                <div className="font-bold flex items-center gap-2">
                  <MapPinned color="red" />
                  <h3>Last Login Location</h3>
                </div>
                <iframe
                  src={`https://www.google.com/maps?q=${locationInfos[0]?.latitude},${locationInfos[0]?.longitude}&z=15&output=embed`}
                  width="270"
                  height="270"
                  style={{ border: 1 }}
                  allowFullScreen
                ></iframe>
                <div className="p-3 text-sm rounded-lg bg-orange-50 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-normal text-gray-500">
                      Latitude
                    </p>
                    <p className="text-[14px] font-medium">
                      {locationInfos[0]?.latitude}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xs font-normal text-gray-500">
                      Longitude
                    </p>
                    <p className="text-[14px] font-medium">
                      {locationInfos[0]?.longitude}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default SingleDevice;
