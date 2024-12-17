import axios from "axios";
import { getItemFromLS } from "./storage";
import { rootStore } from "../store/rootStore";
import { performLogout } from "./authUtils";

// const BASE_URL = "https://6i4wiooc74.execute-api.us-east-1.amazonaws.com/";
// const BASE_URL = "https://amekkdkvdl.execute-api.us-east-1.amazonaws.com/";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export default BASE_URL;

let axiosInstance;
axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = getItemFromLS("id_token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
      }
    } catch (e) {
      console.log(e);
      console.log(`unauthenticated request to ${config.url}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(new Error("Network error or request was not sent"));
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await rootStore.authStore.refreshToken();

        if (newToken) {
          return axiosInstance(originalRequest);
        }
      } catch (e) {
        performLogout();
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
