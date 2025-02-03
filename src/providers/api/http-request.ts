import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiError } from "src/common/errors/errorcodes/api.error";
import { paths } from "./auth/definitions/constants";

const httpRequest = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

httpRequest.interceptors.response.use(
  (response) => response, // ✅ Pass successful responses
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    const requestEndpoint = error.config?.url;
    const { refreshTokens: refreshEndpoint } = paths;

    if (error.response?.status === ApiError.UNAUTHORIZED) {
      if (requestEndpoint === refreshEndpoint) {
        // 🔴 If refresh token itself is invalid → Logout user
        window.location.href = "/auth/signin";
        return Promise.reject(error);
      }

      // 🔄 If refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => resolve(httpRequest(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        // 🔄 Attempt to refresh the session (cookies will be sent automatically)
        await httpRequest.post(refreshEndpoint, {}, { withCredentials: true });

        // ✅ Retry all failed requests
        refreshSubscribers.forEach((callback) => callback());
        refreshSubscribers = [];

        return httpRequest(originalRequest); // ✅ Retry the original request
      } catch (refreshError) {
        // 🔴 Refresh failed → Logout user
        window.location.href = "/auth/signin";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default httpRequest;
