import axios from "../axios"


export const BASE_URL = "http://localhost:8080/"

export const signup = (user) => {
  return axios.post(`${BASE_URL}v1/auth/signup/`, user);
};

export const signin = (user) => {
    return axios.post(`${BASE_URL}v1/auth/login/`, user);
  };