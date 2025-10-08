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
import { nodeApi } from "@/services/api";
import Loader from "@/components/common/Loader";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext/useContext";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { nodeURL, postData } from "@/Utility/apiFuntion";

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
    <div className="flex gap-3 justify-center">
      <div className="min-w-sm">
        {/* Update Profile */}
        <div className="flex items-center h-12 bg-gray-200 border-b border-gray-500">
          <h3 className="px-5 font-bold text-xl">Change Password</h3>
        </div>
        <div className="p-5 border shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
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
                            type={showOldPassword ? "text" : "password"}
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
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
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
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                {isLoading ? <Loader /> : "Update"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
