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
import { nodeApi } from "@/services/api";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext/useContext";
import { EyeIcon, EyeOffIcon, LockKeyhole } from "lucide-react";
import { nodeURL, postData } from "@/Utility/apiFuntion";
import CustomButton from "@/components/Buttons/CustomButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z
  .object({
    old_password: z.string().min(8, "Too short"),
    new_password: z.string().min(8, "Too short"),
    confirm: z.string().min(8, "Too short"),
  })
  .refine((data) => data.new_password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
const ChangePassword = () => {
  const { token } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  /** Define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm: "",
    },
  });
  /** Update function */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const info = {
      old_password: values.old_password,
      new_password: values.new_password,
    };

    const putParams = {
      baseURL: nodeURL,
      url: `${nodeApi.User}/change_password/${token?.user_id}`,
      setLoading: setIsLoading,
      payload: info,
      isToast: true,
    };
    const res = await postData(putParams);

    // const params = {
    //   url: `${nodeApi.User}/change_password/${token?.user_id}`,
    //   method: "POST" as method,
    //   data: info,
    //   isLoading: true,
    //   setIsLoading,
    //   isToast: true,
    // };
    // const res = await fetchData(params);

    if (res?.status === 200) {
      form.reset();
    }
  };
  const handleShowOldPassword = () => {
    if (showOldPassword) {
      setShowOldPassword(false);
    } else {
      setShowOldPassword(true);
    }
  };
  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleShowConfirmPassword = () => {
    if (showConfirmPassword) {
      setShowConfirmPassword(false);
    } else {
      setShowConfirmPassword(true);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <div className="rounded-full p-2 bg-NAVY-100 flex justify-center items-center">
              <LockKeyhole size={24} color="blue" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold">Change Password</p>
              <p className="text-[13px] font-normal">
                Update your account password.
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={handleShowOldPassword}
                          className="absolute right-4 top-2 cursor-pointer"
                        >
                          {showOldPassword ? (
                            <EyeOffIcon size={20} color="#6b7280" />
                          ) : (
                            <EyeIcon size={20} color="#6b7280" />
                          )}
                        </button>
                        <Input
                          className="bg-gray-100"
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Enter your current password"
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
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      New Password
                    </FormLabel>
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
                          className="bg-gray-100"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
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
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Confirm Password
                    </FormLabel>
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
                          className="bg-gray-100"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter your confirm password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end mt-11">
              <CustomButton
                styleType="rectangular"
                type="submit"
                name="update"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
