import axios from "../axios"

// process.env.BASE_URL}
export const BASE_URL = "http://localhost:8080/"

export const signup = (user) => {
  return axios.post(`${BASE_URL}v1/auth/signup/`, user);
};

export const signin = (user) => {
    return axios.post(`${BASE_URL}v1/auth/login/`, user);
  };
export const getProfile = (studentId) => {
    return axios.get(`${BASE_URL}v1/auth/profile/${studentId}`);
  };
export const editProfile = (studentId,data) => {
    return axios.patch(`${BASE_URL}v1/auth/profile/${studentId}`, data);
  };