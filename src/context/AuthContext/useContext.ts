import { useContext } from "react";
import { AuthContext } from "./auth-context";

export function useAuthContext() {
  return useContext(AuthContext);
}
