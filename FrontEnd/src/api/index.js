import {
  httpRequestProtected,
  httpRequest,
  nominatimApi,
} from "./requestController";

export const signUp = (user) => {
  return httpRequest({
    url: "/user/register",
    method: "POST",
    data: user,
  });
};

export const login = (user) => {
  return httpRequest({
    url: "/user/login",
    method: "POST",
    data: user,
  });
};

export const getEmailAvailibility = (email) => {
  return httpRequest({
    url: "/user/emailavailability/" + email,
    method: "GET",
  });
};

export const getAllNests = () => {
  return httpRequest({
    url: "/nest/all",
    method: "GET",
  });
};
export const getNestById = (id) => {
  return httpRequest({
    url: "/nest/byid/" + id,
    method: "GET",
  });
};

export const createNest = (newNest) => {
  return httpRequestProtected({
    url: "/nest/new",
    method: "POST",
    data: newNest,
  });
};

export const searchLocation = (query) => {
  return nominatimApi({
    url: `/search.php?q=${query}&format=jsonv2`,
    method: "GET",
  });
};
