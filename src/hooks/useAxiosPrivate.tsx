import { axiosPrivate } from "../api_call/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useUserContext } from "@/context/AuthProvider";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { userData } = useUserContext();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${userData?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const { access_token: newAccessToken } = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (error) {
            throw new Error("No tokens available");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [userData, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
