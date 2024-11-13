import { getAccessToken, logout } from "../auth/jwtService.js";
import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://ae54-81-95-230-194.ngrok-free.app", //ngrok
  // baseURL: "http://192.168.31.21:8024", //local_server
  // baseURL: "http://95.46.96.74:8011", //server
  timeout: 20000,

  headers: { Accept: "application/json" },
});

//send token
axiosIns.interceptors.request.use(
  (config) => {
    let token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (
        window.location.pathname !== "/sign-in" &&
        window.location.pathname !== "/sign-up"
      ) {
        window.location.href = "/sign-in";
        logout();
      }
    }
    // else if (error.response.status === 422) {
    //   console.log("422", error.response);
    // } else if (error.response.status === 500) {
    //   toast.error("Error from server!");
    // }

    return Promise.reject(error);
  }
);

export default axiosIns;
