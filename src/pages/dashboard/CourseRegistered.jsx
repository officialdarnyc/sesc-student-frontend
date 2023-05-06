import React, { useEffect, useState } from "react";
import course from "../../assets/dash/course.svg";
import next from "../../assets/dash/nexts.svg";
import line from "../../assets/dash/line.svg";
import { usePortal } from "../../context/portalContext";
import { Link } from "react-router-dom";

import { getRegisteredCourses } from "../../services/dashboardService";
import { useAuth } from "../../context/authContext";

function CourseRegistered() {
  const { handleOverview } = usePortal();
  const { student } = useAuth();

  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRegisteredCourses = async () => {
    setIsLoading(true);
    const coursesDataResponse = await getRegisteredCourses(
      student.externalStudentId
    );
    setCoursesData(coursesDataResponse?.data?.data?.courses || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRegisteredCourses();
  }, []);

  return (
    <div className="flex justify-start gap-4 items-center h-[350px] overflow-x-auto my-[20px]">
    {isLoading ? (
      <div className="animate-pulse flex justify-center"></div>
    ) : (
      coursesData.length ? (
        coursesData.map((contents, index) => (
          <div
            key={contents.id || index}
            className="flex flex-col w-[190px] h-[338px] items-center shadow-lg rounded-lg bg-blue-200 backdrop-filter backdrop-blur-lg"
          >
            <div className="flex flex-col w-[190px] h-[338px] items-center shadow-inner rounded-lg bg-white backdrop-filter backdrop-blur-lg py-2">
              <div className="flex items-center pl-3">
                <h1 className="font-bold text-left text-2xl text-black">
                  {contents.courseCode || "--------"}
                </h1>
                <img src={course} alt="" />
              </div>
              <div>
                <p className="flex font-bold self-left  mt-3  h-[30px] w-[190px]  px-4 text-clip overflow-hidden overflow-hidden">
                  {contents.name || "--------"}
                </p>
              </div>
  
              <p className="text-[#009CCC] text-sm  h-[300px] mt-2 mb-[28px] border border-[#009CCC] text-black mx-2 rounded-lg px-3 overflow-y-scroll break-words text-justify font-bold ">
                {contents.description || "--------"}
              </p>
              <img src={line} alt="" />
  
              <div className="flex justify-between items-center px-4 w-[190px] mt-2  ">
                <p className="font-bold text-sm  ">
                  {contents.lessons || "--------"} Lessons
                </p>
                <button
                  onClick={() => handleOverview(contents.StudentsCourses)}
                  className="flex  self-end bg-[#009CCC]  border border-[#009CCC] border-2 rounded-lg px-3 py-2"
                >
                  <img src={next} alt="" className=" text-center" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center m-auto h-[350px]">
          <div className="flex flex-col items-center ">
            <h1 className="text-2xl font-bold text-white">
              You Have No Registered Courses
            </h1>
            <p className="text-lg font-bold text-white">
              Click here
              <Link to="/dashboard/courses" className="text-black">
                {" "}
                COURSES{" "}
              </Link>
              to enrol!
            </p>
          </div>
        </div>
      )
    )}
  </div>
  );
}

export default CourseRegistered;
