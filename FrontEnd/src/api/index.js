import { httpRequestProtected, httpRequest } from "./requestController";

export const signUp = (user) => {
  return httpRequest({
    url: "/user/register",
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
