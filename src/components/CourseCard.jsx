import React, { useEffect } from "react";
import dollar from "../assets/dash/dollar.svg";
import plus from "../assets/dash/plus.svg";
import { useAuth } from "../context/authContext";
import { registerCourses } from "../services/dashboardService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CourseCard({ code, title, lessons, price, id }) {
  const { student } = useAuth();

  const data = {
    studentId: student.externalStudentId,
    courseId: id,
  };

  const handleRegisterCourse = async (data) => {
    try {
      const response = await registerCourses(data);
      toastSuccess(response.data.message);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  const toastSuccess = (message) => {
    toast.success(message);
  };

  const toastError = (message) => {
    toast.error(message);
  };

  return (
    <div className="bg-white px-[10px] py-[15px] flex items-center justify-between rounded-[10px] shadow-2xl ">
      <div className="flex items-center gap-[16px] ">
        <h1 className="text-[#006E90] text-xl font-medium  ">{code}</h1>
        <div className="text-[#2E2D2D]  ">
          <h1 className="font-bold">{title}</h1>
          <p>{lessons} Lessons</p>
        </div>
      </div>
      <div className="flex items-center gap-[36px]">
        <div className="flex items-center  ">
          <img src={dollar} alt="" />
          <p className="text-[#006E90] text-2xl font-medium ">{price}</p>
        </div>
        <button
          className="hover:opacity-75"
          onClick={() => handleRegisterCourse(data)}
        >
          <img src={plus} alt="" />
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CourseCard;
