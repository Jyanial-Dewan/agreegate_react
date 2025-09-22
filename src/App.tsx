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
import { useEffect, useState } from "react";
import { Toaster } from "./components/ui/sonner";
// import axios from "axios";

function App() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  console.log(location, error);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const parser = new UAParser.UAParser();
    const result = parser.getResult();
    console.log(result);
  }, []);

  // useEffect(() => {
  //   const fetchIP = async () => {
  //     const res = await axios.get("/api/geo");

  //     console.log(res);
  //   };
  //   fetchIP();
  // }, []);

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
