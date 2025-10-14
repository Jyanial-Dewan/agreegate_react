import CustomButton from "@/components/Buttons/CustomButton";
import CustomTooltip from "@/components/common/CustomTooltip";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthContext } from "@/context/AuthContext/useContext";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import useAxios, { type method } from "@/hooks/useAxios";
import { nodeApi } from "@/services/api";
import type { IUser } from "@/types/user.interface";
import { Avatar } from "@radix-ui/react-avatar";
// import axios from "axios";
import { Pencil } from "lucide-react";
import { useState } from "react";
const PhotoModal = () => {
  const { token } = useAuthContext();
  const { user, setUser } = useGlobalContext();
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const { fetchData } = useAxios<IUser>("node");
  const [file, setFile] = useState<File | null>(null);

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    }
  };

  const handleUploadPhoto = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    const uploadParams = {
      url: `${nodeApi.User}/update_profile_image/${token?.user_id}`,
      method: "PUT" as method,
      data: formData,
      setIsLoading: setUploading,
      isToast: true,
    };

    // const response = await axios.put(
    //   `http://localhost:3000/api/combined_users/update_profile_image/${user?.user_id}`,
    //   formData,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token?.access_token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    // console.log(response, "respoinse");

    const res = await fetchData(uploadParams);
    if (res?.status === 200) {
      setUser((prev: IUser | null) =>
        prev
          ? {
              ...prev,
              profile_picture: {
                ...prev.profile_picture,
                original: `uploads/profiles/${
                  prev.user_id
                }/thumbnail.jpg?${Date.now()}`,
              },
            }
          : prev
      );
      setPreview("");
      setFile(null);
    }
  };
  return (
    <Dialog>
      <CustomTooltip tooltipTitle="Edit">
        <DialogTrigger asChild>
          <CustomButton styleType="square" type="button">
            <Pencil size={15} color="white" />
          </CustomButton>

          {/* <button className="p-2 rounded-lg bg-client-primary cursor-pointer">
          <Pencil size={15} color="white" />
        </button> */}
        </DialogTrigger>
      </CustomTooltip>
      <DialogContent className="w-1/2">
        <DialogHeader>
          <DialogTitle>Change Photo</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Avatar className="h-28 w-28 rounded-full border-2 border-client-primary object-cover">
              <AvatarImage
                src={`http://localhost:3000/api/${user?.profile_picture.original}`}
              />
              <AvatarFallback className="capitalize text-2xl">
                {user?.user_name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            {/* <img
              className="h-32 w-32 rounded-full border-2 border-client-primary"
              src={`http://localhost:3000/api/${user?.profile_picture.original}`}
              alt="Profile"
            /> */}

            <p className="py-3 font-medium">JPG or PNG no larger than 200KB</p>

            <label className="border rounded-sm cursor-pointer">
              <div className="flex justify-center items-center w-80 h-30">
                {preview ? (
                  <img className="w-25 h-25 rounded-full" src={preview} />
                ) : (
                  <p className="text-gray-600 font-medium">Drop Photo</p>
                )}
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleChangePhoto}
              />
            </label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <CustomButton
            styleType="square"
            type="submit"
            name="Upload"
            disabled={file === null || uploading}
            isLoading={uploading}
            onClick={handleUploadPhoto}
          ></CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoModal;
