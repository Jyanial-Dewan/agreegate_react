import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext/useContext";
import type { IUser } from "@/types/user.interface";

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
  const { token } = useAuthContext();
  const { isLoading, fetchData, response } = useAxios<IUser>("node");

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
    if (response) {
      form.reset({
        username: response.user_name,
        firstname: response.first_name,
        lastname: response.last_name,
        email: response.email_addresses[0] ?? "",
        password: "",
        confirm: "",
      });
    }
  }, [response, form]);

  useEffect(() => {
    const loadUser = async () => {
      const params = {
        url: `${nodeApi.User}/${token?.user_id}`,
        method: "GET" as method,
      };
      await fetchData(params);
    };
    loadUser();
  }, [token?.user_id, fetchData]);

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

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Card className="w-full max-w-md mx-auto max-h-[90vh] overflow-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
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
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
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
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
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
        </CardContent>
      </Card>
    </div>
  );
};
export default UpdateProfile;
