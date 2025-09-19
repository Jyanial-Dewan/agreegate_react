import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

export type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IFetchDataParams {
  url: string;
  method: method;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  isToast?: boolean;
}

const useAxios = (backend: "flask" | "node") => {
  const [response, setResponse] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Keep controller in a ref (avoids mutation issues)
  const controllerRef = useRef<AbortController | null>(null);

  // Setup axios instance
  const axiosInstance = axios.create({
    baseURL: backend === "flask" ? "" : "http://localhost:3000",
  });

  // Request interceptor (example: add auth headers if needed)
  axiosInstance.interceptors.request.use(
    (config) => config,
    (err) => Promise.reject(err)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
  );

  const fetchData = useCallback(
    async (dataParams: IFetchDataParams) => {
      const { url, method, data = {}, params = {}, isToast } = dataParams;
      setIsLoading(true);

      // Cancel any previous request
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const result = await axiosInstance({
          url,
          method,
          data,
          params,
          signal: controllerRef.current.signal,
        });
        setResponse(result.data);
        return result;
        if (isToast) {
          toast(result.data.message);
        }
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", (err as Error).message);
        } else if (axios.isAxiosError(err)) {
          if (isToast) {
            toast(err.response?.data ?? err.message);
          }
        } else if (err instanceof Error) {
          if (isToast) {
            toast(err.message);
          }
        } else {
          if (isToast) {
            toast("An Unknown Error Occured");
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [axiosInstance]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return { response, isLoading, fetchData };
};

export default useAxios;
