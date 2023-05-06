import React from "react";
import search from "../../assets/dash/search.svg";
import notification from "../../assets/dash/bell.svg";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const {student} = useAuth()
  return (
    <div className="h-[80px] w-full shadow-lg py-4 px-8">
      <div className="flex gap-[200px]  justify-start items-center ">
        <h1 className="text-2xl font-bold text-[#006E90]">Welcome {student.firstName}</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="search"
            class="w-[300px] py-2 px-2 border border-1 border-[#006E90] rounded-lg focus:outline-[#006E70] focus:border-[#006E20] focus:ring-2"
          />
          <img
            src={search}
            alt=""
            className="absolute top-2 cursor-pointer right-2 "
          />
        </div>

        <div className="flex items-center justify-betwen w-[120px] gap-2">
          <img src={notification} alt="" className="" />
          <p className="font-bold">{student.firstName}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
