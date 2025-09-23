import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext/useContext";
import useRefreshToken from "./useRefreshToken";

export type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IFetchDataParams {
  url: string;
  method: method;
  data?: Record<string, unknown> | FormData;
  params?: Record<string, unknown>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isToast?: boolean;
}

const useAxios = <T>(backend: "flask" | "node") => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState("");
  const { token } = useAuthContext();
  const refresh = useRefreshToken();

  // Keep controller in a ref (avoids mutation issues)
  const controllerRef = useRef<AbortController | null>(null);

  // Setup axios instance
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: backend === "flask" ? "" : "http://localhost:3000",
    });
  }, [backend]);

  // Request interceptor (example: add auth headers if needed)
  // axiosInstance.interceptors.request.use(
  //   (config) => config,
  //   (err) => Promise.reject(err)
  // );

  // // Response interceptor
  // axiosInstance.interceptors.response.use(
  //   (res) => res,
  //   (err) => Promise.reject(err)
  // );

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        try {
          const prevRequest = error?.config;
          if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(prevRequest);
          }
        } catch (error) {
          console.log(error, "axios private error");
          return;
        }
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  const fetchData = useCallback(
    async (dataParams: IFetchDataParams) => {
      const {
        url,
        method,
        data = {},
        params = {},
        isToast,
        setIsLoading,
      } = dataParams;
      setIsLoading(true);
      const headers =
        data instanceof FormData ? {} : { "Content-Type": "application/json" };

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
          withCredentials: true,
          headers,
        });
        setResponse(result.data.result as T);

        if (isToast) {
          toast(result.data.message);
        }
        return result;
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", (err as Error).message);
        } else if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          if (status === 409) {
            if (isToast) {
              toast(err.response?.data.message);
            }
          } else {
            setError(err.response?.data.message);
            if (dataParams.isToast) {
              toast(err.response?.data.message);
            }
          }
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
          if (isToast) {
            toast(err.message);
          }
        } else {
          setError("An Unknown Error Occured");
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

  return { response, error, fetchData };
};

export default useAxios;
