import React, { useEffect, useState } from "react";
import { getEligibility } from "../../services/dashboardService";
import { useAuth } from "../../context/authContext";

function GraduationEligibility() {
  const [isElig, setIsElig] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { student } = useAuth();

  const fetchEligibilityStudent = async () => {
    setIsLoading(true);
    const eligResponse = await getEligibility(student.externalStudentId);
    setIsElig(eligResponse?.data?.data.hasOutstandingBalance);
    setIsLoading(false);
    console.log(eligResponse, "rcheckz");
    console.log(eligResponse?.data?.data.hasOutstandingBalance, "cwaercheckz");
  };
  useEffect(() => {
    fetchEligibilityStudent();
  }, []);
  console.log(isElig, "checkz");

  return (
    <div className="flex items-center justify-center m-auto h-[350px]">
      {isLoading ? (
        <div>checking...</div>
      ) : isElig ? (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-red">
            Sorry, You Are Not Eligible To Graduate!
          </h1>
          <p className="text-lg font-bold text-red">
            You have an outstanding invoice.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white">
            Congratulations!!! You Are Eligible To Graduate.
          </h1>
          <p className="text-lg font-bold text-white">
            You don't have any outstanding invoice.
          </p>
        </div>
      )}
    </div>
  );
}

export default GraduationEligibility;
