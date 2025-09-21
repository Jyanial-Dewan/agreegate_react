import { RouterProvider } from "react-router";
import router from "./routes/routes";
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
  deviceType,
  mobileVendor,
  mobileModel,
  engineName,
  engineVersion,
} from "react-device-detect";
import * as UAParser from "ua-parser-js";
import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import axios from "axios";

function App() {
  useEffect(() => {
    const parser = new UAParser.UAParser();
    const result = parser.getResult();
    console.log(result);
  }, []);

  useEffect(() => {
    const fetchIP = async () => {
      const res = await axios.get("/api/geo");

      console.log(res);
    };
    fetchIP();
  }, []);

  console.log(
    "browser name: ",
    browserName,
    "browser version: ",
    browserVersion,
    "os Name: ",
    osName,
    "os Version: ",
    osVersion,
    "device Type:",
    deviceType,
    "mobile Vendor:",
    mobileVendor,
    "mobile Model:",
    mobileModel,
    "engine name: ",
    engineName,
    "engine Version: ",
    engineVersion
  );
  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
