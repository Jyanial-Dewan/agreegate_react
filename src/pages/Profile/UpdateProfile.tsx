import type { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
// import useAxios, { type method } from "@/hooks/useAxios";
import { nodeApi } from "@/services/api";
import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext/useContext";
import type { IUser } from "@/types/user.interface";
// import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { nodeURL, putData } from "@/Utility/apiFuntion";
import type { method } from "@/hooks/useAxios";
import useAxios from "@/hooks/useAxios";
import Image from "../../assets/profile.jpg";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, "Too short").max(50, "Too long"),
  firstname: z.string().min(2, "Too short"),
  lastname: z.string().min(2, "Too short"),
  email: z.email("Type valid email"),
  phone_number: z.string().min(11, "Please enter at least 11 digits"),
});

const UpdateProfile = () => {
  const { token } = useAuthContext();
  const { user, setUser } = useGlobalContext();
  const { fetchData } = useAxios<IUser>("node");
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);

  /** Define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      // password: "",
      // confirm: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user?.user_name,
        firstname: user?.first_name,
        lastname: user?.last_name,
        email: user?.email_address,
        phone_number: user?.phone_number,
        // confirm: "",
      });
    }
  }, [user, form]);

  /** Update function */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const info = {
      user_type: "person",
      user_name: values.username,
      email_address: values.email,
      first_name: values.firstname,
      last_name: values.lastname,
      phone_number: values.phone_number,
    };

    const putParams = {
      baseURL: nodeURL,
      url: nodeApi.User + "/" + token?.user_id,
      setLoading: setIsUpdating,
      payload: info,
      isToast: true,
    };
    const res = await putData(putParams);
    if (res?.status === 200) {
      form.reset({
        username: res.data.result.user_name,
        firstname: res.data.result.first_name,
        lastname: res.data.result.last_name,
        email: res.data.result.email_address,
        phone_number: res.data.result.phone_number,
      });
    }
  };

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
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-2 rounded-lg bg-white p-5">
        <div className="relative">
          <img
            className="h-28 w-28 rounded-full border-2 border-client-primary object-cover"
            src={`http://localhost:3000/api/${user?.profile_picture.original}`}
            // src={Image}
            alt="Profile"
          />
          <button className="absolute bottom-1 -right-1 p-2 rounded-lg bg-client-primary cursor-pointer">
            <Pencil size={15} color="white" />
          </button>
        </div>
        <div className="flex justify-between w-full">
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
          <button className="p-2 rounded-lg bg-client-primary self-start cursor-pointer">
            <Pencil size={15} color="white" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-5">
        {/* Update Profile */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Profile Details</h3>
          <button className="p-2 rounded-lg bg-client-primary cursor-pointer">
            <Pencil size={15} color="white" />
          </button>
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      international
                      defaultCountry="BD"
                      placeholder="Enter phone number"
                      {...field}
                      value={field.value as E164Number}
                      onChange={(value) => field.onChange(value)}
                      className="w-full border rounded-md p-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={handleShowPassword}
                              className="absolute right-4 top-2 cursor-pointer"
                            >
                              {showPassword ? (
                                <EyeOffIcon size={20} color="#6b7280" />
                              ) : (
                                <EyeIcon size={20} color="#6b7280" />
                              )}
                            </button>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="*********"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={handleShowConfirmPassword}
                              className="absolute right-4 top-2 cursor-pointer"
                            >
                              {showConfirmPassword ? (
                                <EyeOffIcon size={20} color="#6b7280" />
                              ) : (
                                <EyeIcon size={20} color="#6b7280" />
                              )}
                            </button>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="*********"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
          </div>
          <Button
            type="submit"
            className="cursor-pointer self-center"
            disabled={isUpdating}
          >
            {isUpdating ? <Loader color="white" /> : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default UpdateProfile;
