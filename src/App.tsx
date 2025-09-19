import { RouterProvider } from "react-router";
import router from "./routes/routes";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
