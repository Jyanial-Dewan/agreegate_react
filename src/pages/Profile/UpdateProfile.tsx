// import Loader from "@/components/common/Loader";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
// import Image from "../../assets/profile.jpg";
import ProfileModal from "./ProfileModal";
import PhotoModal from "./PhotoModal";
// import { useAuthContext } from "@/context/AuthContext/useContext";
// import { useParams } from "react-router";
// import { useEffect, useState } from "react";
// import { loadData, nodeURL } from "@/Utility/apiFuntion";
// import { nodeApi } from "@/services/api";
// import type { IClientInfo } from "@/types/deviceInfo.interface";
// import Loader from "@/components/common/Loader";

const UpdateProfile = () => {
  const { user } = useGlobalContext();
  // const { token } = useAuthContext();
  // const { device_id } = useParams();

  // const [info, setInfo] = useState<IClientInfo | null>(null);
  // const [locationInfos, setLocationInfos] = useState<IClientLocationInfo[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPageNumbers, setTotalPageNumbers] = useState(1);

  // useEffect(() => {
  //   const loadClients = async () => {
  //     const clientParams = {
  //       baseURL: nodeURL,
  //       url: `${nodeApi.ClientInfo}?user_id=${token?.user_id}&device_id=${device_id}`,
  //       setLoading: setLoading,
  //     };

  //     const clientRes = await loadData(clientParams);
  //     console.log(clientRes);
  //     if (clientRes?.status === 200) {
  //       setInfo(clientRes.data.result);
  //     }

  //     // const locationParams = {
  //     //   baseURL: nodeURL,
  //     //   url: `${nodeApi.ClientLocationInfo}?device_id=${device_id}&user_id=${token?.user_id}&page=${currentPage}&limit=10`,
  //     //   setLoading: setLoading,
  //     // };

  //     //   const locationRes = await loadData(locationParams);
  //     //   console.log(locationRes);
  //     //   if (locationRes?.status === 200) {
  //     //     setLocationInfos(locationRes.data.result);
  //     //     setTotalPageNumbers(locationRes.data.totalPages);
  //     //   }
  //   };

  //   loadClients();
  // }, [token?.user_id, device_id, currentPage]);

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-2 rounded-lg bg-white p-5">
        <div className="relative">
          <img
            className="h-28 w-28 rounded-full border-2 border-client-primary object-cover"
            src={`http://localhost:3000/api/${user?.profile_picture.original}`}
            // src={Image}
            alt="Profile"
          />
          <div className="absolute bottom-1 right-1">
            <PhotoModal />
          </div>
        </div>
        <div>
          <h2 className="capitalize font-bold">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="text-[14px] font-semibold text-client-primary capitalize">
            {user?.user_type}
          </p>
          {/* {loading ? (
            <Loader size="40" color="black" />
          ) : (
            <p className="text-[14px] font-semibold text-gray-600 capitalize">
              {info?.city} {info?.region} {info?.country}
            </p>
          )} */}
        </div>
      </div>

      <div className="bg-white rounded-lg p-5">
        {/* Update Profile */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Profile Details</h3>
          <ProfileModal />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <h2 className="font-normal text-xs text-gray-500">First Name</h2>
            <p className="text-base font-medium">{user?.first_name}</p>
          </div>
          <div>
            <h2 className="font-normal text-xs text-gray-500">Last Name</h2>
            <p className="text-base font-medium">{user?.last_name}</p>
          </div>
          <div>
            <h2 className="font-normal text-xs text-gray-500">Username</h2>
            <p className="text-base font-medium">{user?.user_name}</p>
          </div>
          <div>
            <h2 className="font-normal text-xs text-gray-500">Email</h2>
            <p className="text-base font-medium">{user?.email_address}</p>
          </div>
          <div>
            <h2 className="font-normal text-xs text-gray-500">Email</h2>
            <p className="text-base font-medium">{user?.email_address}</p>
          </div>
          <div>
            <h2 className="font-normal text-xs text-gray-500">Phone Number</h2>
            <p className="text-base font-medium">{user?.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
