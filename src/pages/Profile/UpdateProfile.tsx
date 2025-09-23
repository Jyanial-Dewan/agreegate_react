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
import useAxios, { type method } from "@/hooks/useAxios";
import { nodeApi } from "@/services/api";
import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext/useContext";
import type { IUser } from "@/types/user.interface";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z
  .object({
    username: z.string().min(2, "Too short").max(50, "Too long"),
    firstname: z.string().min(2, "Too short"),
    lastname: z.string().min(2, "Too short"),
    email: z.email("Type valid email"),
    password: z.string().min(8, "Too short"),
    confirm: z.string().min(8, "Too short"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

const UpdateProfile = () => {
  const { token, user } = useAuthContext();
  const { fetchData } = useAxios<IUser>("node");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  /** Define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user?.user_name,
        firstname: user?.first_name,
        lastname: user?.last_name,
        email: user?.email_addresses[0] ?? "",
        password: "",
        confirm: "",
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
      password: values.password,
    };
    const params = {
      url: nodeApi.User + "/" + token?.user_id,
      method: "PUT" as method,
      data: info,
      setIsLoading,
      isToast: true,
    };
    const res = await fetchData(params);

    if (res?.status === 200) {
      form.reset({
        username: res.data.result.user_name,
        firstname: res.data.result.first_name,
        lastname: res.data.result.last_name,
        email: res.data.result.email_addresses[0] ?? "",
        password: "",
        confirm: "",
      });
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
      setIsLoading: setLoading,
      isToast: true,
    };

    await fetchData(uploadParams);
  };

  return (
    <div className="flex gap-3 justify-center">
      <div className="w-96 flex flex-col border shadow-md">
        {/* Header */}
        <div className="flex mb-2 items-center h-12 bg-gray-200 border-b border-gray-500">
          <h3 className="px-5">Profile Photo</h3>
        </div>
        {/* Content area */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <img
              className="h-28 w-28 rounded-full"
              src="https://github.com/shadcn.png"
            />
            <h2 className="font-semibold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="py-3">JPG or PNG no larger than 5 MB</p>

            <label className="border rounded-sm cursor-pointer">
              <div className="flex justify-center items-center w-80 h-30">
                {preview ? (
                  <img className="w-25 h-25 rounded-full" src={preview} />
                ) : (
                  <p className="text-gray-600">Drop Photo</p>
                )}
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleChangePhoto}
              />
            </label>

            <Button onClick={handleUploadPhoto} className="my-3">
              {loading ? <Loader /> : "Upload"}
            </Button>
          </div>
        </div>
      </div>
      <div>
        {/* Update Profile */}
        <div className="flex items-center h-12 bg-gray-200 border-b border-gray-500">
          <h3 className="px-5">Profile Details</h3>
        </div>
        <div className="p-5 border shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3">
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
                </div>
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
                <div className="flex gap-3">
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
                </div>
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? <Loader /> : "Update"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
