import { RouterProvider } from "react-router";
import router from "./routes/routes";

import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { useGlobalContext } from "./context/GlobalContext/useGlobalContext";

function App() {
  const { setDeviceLocation } = useGlobalContext();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setDeviceLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.log(err.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [setDeviceLocation]);
  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
