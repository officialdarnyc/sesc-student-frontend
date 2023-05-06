import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { getCourses } from "../../services/dashboardService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Courses() {
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const coursesDataResponse = await getCourses();
      setCoursesData(coursesDataResponse?.data?.data || []);
    } catch (error) {
      toast.error("Unable to fetch courses data");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="my-[20px] flex flex-col gap-[30px] overflow-y-auto h-[350px]">
      {isLoading ? (
        <div className="animate-pulse flex justify-center">loading...</div>
      ) : (
        coursesData.map((course) => (
          <CourseCard
            code={course.coursecode}
            title={course.name}
            lessons={course.lessons}
            price={course.fee}
            id={course.id}
          />
        ))
      )}
    </div>
  );
}

export default Courses;
