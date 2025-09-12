import axios from "axios";
import { handleLogout, handlerefreshToken } from "Redux/Action/Common.Action";
import store from "Store";

const baseURL = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (!originalRequest._retry && error.response.data?.message === "Token expired") {
        originalRequest._retry = true;
        try {
          await store.dispatch(handlerefreshToken());
          return axiosInstance(originalRequest);
        } catch (err) {
          store.dispatch(handleLogout());
          return Promise.reject(err);
        }
      } else {
        store.dispatch(handleLogout());
      }
    }


    if (error.code === "ERR_BAD_REQUEST") {
      const errObj = { ...error };
      errObj.response.data = {
        success: false,
        data: {},
        message:
          errObj.response.data.message || "ERR_BAD_REQUEST",
      };
      return Promise.reject(errObj);
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state?.commonState?.user_details?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default axiosInstance;
