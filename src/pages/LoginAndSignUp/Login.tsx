import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext/useContext";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  /** Login */
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("login");
    navigate("/");
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
                <a
                  href="#"
                  className="ml-auto text-sm text-gray-500 hover:text-gray-700 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            onClick={handleLogin}
            type="submit"
            className="w-full cursor-pointer"
          >
            Login
          </Button>
          <p>
            Don't have an account?
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
