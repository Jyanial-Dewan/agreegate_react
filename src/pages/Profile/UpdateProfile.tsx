// import Loader from "@/components/common/Loader";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
// import Image from "../../assets/profile.jpg";
import ProfileModal from "./ProfileModal";
import PhotoModal from "./PhotoModal";

const UpdateProfile = () => {
  const { user } = useGlobalContext();

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
          <p className="text-[14px] font-semibold text-gray-600">
            West Shewrapara,Dhaka,Bangladesh
          </p>
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
