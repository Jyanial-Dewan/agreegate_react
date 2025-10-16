import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext/useContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
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
import { nodeApi } from "@/services/api";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import ClientImage from "/images/client.svg";
import { nodeURL, postData } from "@/Utility/apiFuntion";
import CustomButton from "@/components/Buttons/CustomButton";

const formSchema = z.object({
  email: z.string().min(2, "Too Short"),
  password: z.string().min(8, "Password must be at least 8 character"),
});

const Login = () => {
  const { setToken, token } = useAuthContext();

  const { deviceInfo, setDeviceInfo } = useGlobalContext();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const location = useLocation();

  // const from = location.state || "";
  /** Define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /** Login function */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const info = {
      user: values.email,
      password: values.password,
    };
    const params = {
      baseURL: nodeURL,
      url: nodeApi.Login,
      setLoading: setIsLoading,
      payload: info,
    };
    const res = await postData(params);

    if (res?.status === 200) {
      setToken(res.data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token?.access_token}`;

      const clientInfoParams = {
        baseURL: nodeURL,
        url: nodeApi.ClientInfo,
        setLoading: setIsLoading,
        payload: { user_id: res.data.user_id, ...deviceInfo },
      };
      const clientInfoResponse = await postData(clientInfoParams);

      if (
        clientInfoResponse?.status === 201 ||
        clientInfoResponse?.status === 200
      ) {
        setDeviceInfo((prev) => ({
          ...prev,
          deviceId: clientInfoResponse.data.result.device_id,
          // is_active: prev?.is_active ?? true,
        }));
        localStorage.setItem(
          "ClientInfo",
          JSON.stringify(clientInfoResponse.data.result)
        );
        navigate("/");
      }
    }
  };

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  // if (token && token.isLoggedIn && deviceInfo?.deviceId) {
  //   return <Navigate state={location.pathname} to={from} replace />;
  // }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center p-4">
      <div className="w-[50%] h-full">
        <img src={ClientImage} className="w-full h-full" />
      </div>

      <div className="flex flex-col gap-4 w-[50%] h-full justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-bold text-lg"> Login</h3>
          <p className="text-xs text-gray-600">
            Welcome back! Please enter your details
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username, Email or Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g; +88018*, user or email"
                      {...field}
                      className="w-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        className="w-[300px]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button
              type="submit"
              className="w-full cursor-pointer bg-client-primary hover:bg-client-primary"
              disabled={isLoading}
            >
              {isLoading ? <Loader color="white" /> : "Login"}
            </Button> */}
            <CustomButton
              styleType="full"
              type="submit"
              name="login"
              disabled={isLoading}
              isLoading={isLoading}
            />
          </form>
        </Form>
        {/* <span className="text-red-600">{error}</span> */}
        <p>
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-blue-600 font-bold hover:cursor-pointer underline-offset-4 hover:underline"
          >
            Create one here
          </Link>
        </p>
      </div>
      {/* <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          
        </CardContent>
        <CardFooter className="flex-col gap-2">
         
        </CardFooter>
      </Card> */}
    </div>
  );
};

export default Login;
