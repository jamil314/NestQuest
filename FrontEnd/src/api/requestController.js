import axios from "axios";
import { mockApi } from "./mockApi";

export const axiosCall = (requestConfig) => {
  return mockApi(requestConfig);
  //   return axios({
  //     ...requestConfig,
  //     baseURL: process.env.REACT_APP_BASE_URL,
  //   });
};

export const callApi = (requestConfig) => {
  const jwtToken = localStorage.getItem("token");
  if (!jwtToken) throw new Error("User not logged in");
  return axiosCall({
    ...requestConfig,
    headers: {
      BearerToken: jwtToken,
    },
  });
};
