import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import type { method } from "@/hooks/useAxios";
import useAxios from "@/hooks/useAxios";
import Loader from "@/components/common/Loader";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";

const formSchema = z.object({
  email: z.string().min(2, "Too Short"),
  password: z.string().min(8, "Password must be at least 8 character"),
});

const Login = () => {
  const { setToken, token } = useAuthContext();

  const { deviceInfo, setDeviceInfo } = useGlobalContext();

  const { fetchData, error } = useAxios("node");
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
      url: nodeApi.Login,
      method: "POST" as method,
      data: info,
      isLoading: true,
      setIsLoading,
    };
    const res = await fetchData(params);

    if (res?.status === 200) {
      setToken(res.data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token?.access_token}`;
      // console.log(res.data.user_id, deviceInfo);
      const clientInfoParams = {
        url: nodeApi.ClientInfo,
        method: "POST" as method,
        data: { userId: res.data.user_id, ...deviceInfo },
      };
      const clientInfoResponse = await fetchData(clientInfoParams);
      console.log(clientInfoResponse);
      if (
        clientInfoResponse?.status === 201 ||
        clientInfoResponse?.status === 200
      ) {
        setDeviceInfo((prev) => ({
          ...prev,
          deviceId: clientInfoResponse.data.result.device_id,
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
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="username or email"
                        {...field}
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
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer">
                {isLoading ? <Loader /> : "Login"}
              </Button>
            </form>
          </Form>
          <span className="text-red-600">{error}</span>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p>
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-600 hover:text-blue-800 hover:cursor-pointer underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
