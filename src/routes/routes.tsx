import MainLayout from "@/layouts/MainLayout";
import Error from "@/pages/ErrorPage/Error";
import Home from "@/pages/Home/Home";
import Login from "@/pages/LoginAndSignUp/Login";
import SignUp from "@/pages/LoginAndSignUp/SignUp";
import UpdateProfile from "@/pages/Profile/UpdateProfile";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
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
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
