import MainLayout from "@/layouts/MainLayout";
import Error from "@/pages/ErrorPage/Error";
import Home from "@/pages/Home/Home";
import Login from "@/pages/LoginAndSignUp/Login";
import SignUp from "@/pages/LoginAndSignUp/SignUp";
import MyDevices from "@/pages/MyDevices/MyDevices";
import UpdateProfile from "@/pages/Profile/UpdateProfile";
import SingleDevice from "@/pages/SingleDevice/SingleDevice";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "my-devices",

        children: [
          { path: "", element: <MyDevices /> },
          {
            path: ":device_id", // ✅ relative
            element: <SingleDevice />,
          },
        ],
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
    path: "*",
    element: <Error />,
  },
]);

export default router;
