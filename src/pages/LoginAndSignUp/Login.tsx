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
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8),
});

const Login = () => {
  const { setIsLoggedIn } = useAuthContext();
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
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Form {...form}>
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
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
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            </form>
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
      </Form>
    </div>
  );
};

export default Login;
