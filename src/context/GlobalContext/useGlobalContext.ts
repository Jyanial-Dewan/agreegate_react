import { useContext } from "react";
import { GlobalContext } from "./global-context";

export function useGlobalContext() {
  return useContext(GlobalContext);
}
