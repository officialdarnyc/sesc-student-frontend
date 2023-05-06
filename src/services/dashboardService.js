import axios from "../axios"
import { BASE_URL } from "./authService";


export const getCourses = () => {
  return axios.get(`${BASE_URL}v1/dashboard/courses`);
};
export const registerCourses = (data) => {
  return axios.post(`${BASE_URL}v1/dashboard/courses`,data);
};
export const getRegisteredCourses = (studentId) => {
  return axios.get(`${BASE_URL}v1/dashboard/courses/${studentId}`);
};
export const getEligibility = (studentId) => {
  return axios.get(`${BASE_URL}v1/dashboard/eligibility/${studentId}`);
};
