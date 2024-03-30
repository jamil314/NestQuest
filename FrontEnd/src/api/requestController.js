import axios from "axios";
// import { mockApi } from "./mockApi";

export const httpRequest = (requestConfig) => {
  // return mockApi(requestConfig);
  return axios({
    ...requestConfig,
    // baseURL: "https://nest-quest-orpin.vercel.app",
    // baseURL: import.meta.env.VITE_REACT_REQUEST_URL,
    baseURL:
      import.meta.env.VITE_REACT_REQUEST_URL_LOCAL ||
      "https://nest-quest-orpin.vercel.app",
  });
};

export const httpRequestProtected = (requestConfig) => {
  const jwtToken = localStorage.getItem("token");
  if (!jwtToken) throw new Error("User not logged in");
  return httpRequest({
    ...requestConfig,
    headers: {
      BearerToken: jwtToken,
    },
  });
};

export const nominatimApi = (requestConfig) => {
  return axios({
    ...requestConfig,
    baseURL: "https://nominatim.openstreetmap.org",
  });
};
