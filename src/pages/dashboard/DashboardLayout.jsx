import React from "react";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import Navbar from "../../components/dashboardComponents/Navbar";
import { usePortal } from "../../context/portalContext";
import { useAuth } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardLayout({ children }) {
  const { student } = useAuth();
  const { overview } = usePortal();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/dasboard/courses" && !student) {
    navigate("/login");
  }

  return student ? (
    <div className="w-screen h-screen overflow-hidden pb-6">
      <div className="flex">
        <Sidebar />
        <div>
          <Navbar />
          <div className="flex flex-col gap-8 w-full h-screen py-8 px-8">
            <div className="flex  gap-8 w-full">
              <div className="w-[750px] h-[400px] bg-[#006E90]   px-[35px] rounded-lg ">
                {children}
              </div>
              <div
                className={` w-[270px] h-[400px] bg-[#D9D9D9] shadow-inner shadow-lg  rounded-lg `}
              >
                <div
                  className={` flex flex-col w-full h-full items-center  rounded-lg bg-[#009CCC] `}
                >
                  <div
                    className={`flex flex-col w-full h-full items-center rounded-lg bg-[#009CCC]  py-2`}
                  >
                    <p className="text-lg font-bold ">Overview</p>

                    <div className="flex items-center pl-3 mt-4">
                      <img src="" alt="" />
                    </div>
                    <div className="flex flex-wrap text-white text-center mx-2">
                      <h4 className="flex font-bold self-left  mt-2 h-[30px]  px-2">
                        student id:
                      </h4>
                      <h4 className="flex font-bold self-left  mt-2  h-[30px] text-black  px-2">
                        {overview.matNumber || "---------"}
                      </h4>
                      <h4 className="flex font-bold self-left  mt-2 h-[30px]  px-2">
                        Course code:
                      </h4>
                      <h4 className="flex font-bold self-left  mt-2  h-[30px] text-black  px-2">
                        {overview.matnumber || "---------"}
                      </h4>
                      <h4 className="flex font-bold self-left  mt-3  h-[30px]  px-2">
                        Reference :
                      </h4>
                      <h4 className="flex font-bold self-left  mt-3  h-[30px] text-black  px-2">
                        {overview.reference || "---------"}
                      </h4>
                      <h4 className="flex font-bold self-left  mt-3  h-[30px]  px-2">
                        Payment status:
                      </h4>
                      <h4 className="flex font-bold self-left  mt-3  h-[30px] text-black  px-2">
                        ---------
                      </h4>
                      <h4 className="flex font-bold self-left  mt-3  h-[30px]  px-2">
                        Due Date:
                      </h4>
                      <h4 className="flex font-bold self-left  mt-3  h-[30px] text-black  px-2">
                        ---------
                      </h4>
                      <h4 className="flex font-bold self-left  mt-3  h-[30px]  px-2">
                        amount:
                      </h4>
                      <h4 className="flex font-bold self-left  mt-3  h-[30px] text-black  px-2">
                        ---------
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between">
              <div className="w-[273px] h-[200px] bg-[#D9D9D9] rounded-lg animate-pulse"></div>
              <div className="w-[273px] h-[200px] bg-[#D9D9D9] rounded-lg animate-pulse"></div>
              <div className="w-[428px] h-[200px] bg-[#D9D9D9] rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div className="w-[750px] h-[400px] bg-[#006E90]   px-[35px] rounded-lg ">
            {children}
          </div>
        </div>
      </div>
    </div>
  ) : (
    navigate("/login")
  );
}

export default DashboardLayout;
