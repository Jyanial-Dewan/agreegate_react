import MainLayout from "@/layouts/MainLayout";
import Error from "@/pages/ErrorPage/Error";
import Login from "@/pages/LoginAndSignUp/Login";
import SignUp from "@/pages/LoginAndSignUp/SignUp";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <MainLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
