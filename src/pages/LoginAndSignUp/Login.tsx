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

const formSchema = z.object({
  email: z.string().min(2, "Too Short"),
  password: z.string().min(8, "Password must be at least 8 character"),
});

const Login = () => {
  const { setToken, token } = useAuthContext();
  const { isLoading, fetchData, error } = useAxios("node");

  const navigate = useNavigate();

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
    };
    const res = await fetchData(params);
    if (res?.status === 200) {
      setToken(res.data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token?.access_token}`;
      localStorage.setItem("token", JSON.stringify(res.data));
      navigate("/");
    }
  };

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
                      <Input
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
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
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
