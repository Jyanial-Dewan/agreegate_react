import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext/useContext";
import type { method } from "@/hooks/useAxios";
import useAxios from "@/hooks/useAxios";
import { nodeApi } from "@/services/api";
import type { IClientInfo } from "@/types/deviceInfo.interface";
import { useEffect, useState } from "react";
import iOS from "/icons/device/apple.png";
import Windows from "/icons/device/windows.png";
import MacOS from "/icons/device/apple.png";
import Linux from "/icons/device/linux.png";
import Android from "/icons/device/android.png";
import Edge from "/icons/device/microsoft.png";
import Chrome from "/icons/device/chrome.png";
import Safari from "/icons/device/safari.png";
import Firefox from "/icons/device/firefox.png";
import Opera from "/icons/device/opera.png";
import Undefined from "/icons/undefined.svg";
import Loader from "@/components/common/Loader";
import { useNavigate } from "react-router";

const MyDevices = () => {
  const { token } = useAuthContext();
  const { fetchData } = useAxios("node");
  const navigate = useNavigate();

  const [clinets, setClients] = useState<IClientInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadClients = async () => {
      console.log(`${nodeApi.ClientInfo}?user_id=${token?.user_id}`);
      const params = {
        url: `${nodeApi.ClientInfo}?user_id=${token?.user_id}`,
        method: "GET" as method,
        isLoading: loading,
        setIsLoading: setLoading,
      };
      const res = await fetchData(params);
      console.log(res);
      if (res?.status === 200) {
        setClients(res.data.result);
      }
    };
    loadClients();
  }, [fetchData, loading, token?.user_id]);
  return (
    <div className="p-4">
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>My Devices</CardTitle>
          <CardDescription>
            List of devices, your account is logged in
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader size="40" color="black" />
          ) : (
            <div className="flex flex-col gap-4">
              {clinets.map((cl) => (
                <div
                  key={cl.device_id}
                  className="p-4 bg-white flex justify-between items-center"
                >
                  <div className="flex gap-2">
                    <div>
                      <img
                        src={
                          cl.os_name === "Windows"
                            ? Windows
                            : cl.os_name === "Linux"
                            ? Linux
                            : cl.os_name === "Mac"
                            ? MacOS
                            : cl.os_name === "iOS"
                            ? iOS
                            : cl.os_name === "Android"
                            ? Android
                            : Undefined
                        }
                        alt="image"
                        className="w-6"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{cl.os_name}</p>
                      <span className=" ">
                        <span>{`${cl.region_name}, ${cl.country}`}</span>
                        <span> - </span>
                        <span className="font-medium">{cl.ip_address}</span>
                      </span>
                      <div className="flex gap-1 items-center">
                        <img
                          src={
                            cl.browser_name === "Edge"
                              ? Edge
                              : cl.browser_name === "Chrome"
                              ? Chrome
                              : cl.browser_name === "Safari"
                              ? Safari
                              : cl.browser_name === "Firefox"
                              ? Firefox
                              : cl.browser_name === "Opera"
                              ? Opera
                              : Undefined
                          }
                          alt="image"
                          className="w-4 h-4"
                        />
                        <p>{cl.browser_version}</p>
                      </div>
                      {/* <p
                        className="text-blue-600 font-semibold cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedDevice(device);
                        }}
                      >
                        View Singon Audit
                      </p> */}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p
                      className="text-blue-500 font-bold cursor-pointer"
                      onClick={() => navigate(`/my-devices/${cl.device_id}`)}
                    >
                      See Details
                    </p>
                    {/* <Switch
                      disabled={device.is_active === 0 && true}
                      checked={device.is_active === 1 ? true : false}
                      onCheckedChange={() => {
                        // setIsActive(true);
                        switchFunc(device);
                      }}
                    /> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyDevices;
