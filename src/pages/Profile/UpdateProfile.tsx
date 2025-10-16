import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import PhotoModal from "./PhotoModal";
import { Input } from "@/components/ui/input";
import type { E164Number } from "libphonenumber-js/core";
import PhoneInput from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { nodeURL, putData } from "@/Utility/apiFuntion";
import { nodeApi } from "@/services/api";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext/useContext";

import CustomButton from "@/components/Buttons/CustomButton";
import { Save } from "lucide-react";
import CustomTooltip from "@/components/common/CustomTooltip";

const formSchema = z.object({
  username: z.string().min(2, "Too short").max(50, "Too long"),
  firstname: z.string().min(2, "Too short"),
  lastname: z.string().min(2, "Too short"),
  email: z.email("Type valid email"),
  phone_number: z.string().min(11, "Please enter at least 11 digits"),
});

const UpdateProfile = () => {
  const { token } = useAuthContext();
  const { user, deviceInfo } = useGlobalContext();
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phone_number: "",
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

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-2 rounded-lg bg-white p-5">
        <div className="relative">
          <Avatar className="h-28 w-28 rounded-full border-2 border-client-primary object-cover">
            <AvatarImage
              src={`http://localhost:3000/api/${user?.profile_picture?.original}`}
            />
            <AvatarFallback className="capitalize text-2xl">
              {user?.user_name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1">
            <PhotoModal />
          </div>
        </div>
        <div>
          <h2 className="capitalize font-bold">
            {user?.first_name} {user?.last_name}
          </h2>

          <p className="text-[14px] font-semibold text-gray-600 capitalize">
            {deviceInfo?.city}, {deviceInfo?.region_name}, {deviceInfo?.country}
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-white rounded-lg p-5">
            {/* Update Profile */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">Profile Details</h3>
              <CustomTooltip tooltipTitle="Save">
                <CustomButton
                  styleType="square"
                  type="submit"
                  disabled={!form.formState.isDirty || isUpdating}
                  isLoading={isUpdating}
                >
                  <Save size={24} color="white" />
                </CustomButton>
              </CustomTooltip>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-xs text-gray-500">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base font-medium border-0 shadow-none"
                        placeholder="first name"
                        {...field}
                      />
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
                    <FormLabel className="font-normal text-xs text-gray-500">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base font-medium border-0 shadow-none"
                        placeholder="last name"
                        {...field}
                      />
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
                    <FormLabel className="font-normal text-xs text-gray-500">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base font-medium border-0 shadow-none"
                        placeholder="username"
                        {...field}
                      />
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
                    <FormLabel className="font-normal text-xs text-gray-500">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base font-medium border-0 shadow-none"
                        type="email"
                        placeholder="email"
                        {...field}
                      />
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
                    <FormLabel className="font-normal text-xs text-gray-500">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry="BD"
                        placeholder="Enter phone number"
                        {...field}
                        value={field.value as E164Number}
                        onChange={(value) => field.onChange(value)}
                        className="text-base font-medium w-full p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="grid grid-cols-2 gap-2">
          <div>
            <h2 className="font-normal text-xs text-gray-500">First Name</h2>
            <p className="text-base font-medium">{user?.first_name}</p>
          </div>
          <div>
            <h2 className="font-normal text-xs text-gray-500">Last Name</h2>
            <Input
              className="border-0 shadow-none"
              type="text"
              value={user?.first_name}
            />
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
        </div> */}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default UpdateProfile;
