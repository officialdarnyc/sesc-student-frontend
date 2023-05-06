import React from "react";
import cap from "../../assets/dash/cap.svg";
import { navContent } from "../../data/sideNavContetnt";
import { usePortal } from "../../context/portalContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const { activeNav, handleActiveNav } = usePortal();

  return (
    <div className="flex flex-col  items-center h-screen w-[273px] border-l border-[2px] pt-[22px] px-[40px] shadow-lg ">
      <div>
        <img src={cap} alt="" className="mx-auto" />
        <h1 className="text-[#006E90] font-semibold text-center mt-2 ">
          STUDENT PORTAL
        </h1>
      </div>
      <div className="flex flex-col justify-center gap-8 mt-[60px] ">
        {navContent.map((items, index) => {
          return (
            <Link to={items.link}>
              <div
                onClick={() => handleActiveNav(items.content)}
                key={index}
                className={`${
                  activeNav === items.content
                    ? "bg-[#006E80] text-white w-[200px]"
                    : ""
                }  flex gap-4 text-md   py-2 px-6 rounded-lg cursor:pointer`}
              >
                <img src={items.img} alt={items.content} />
                <h6>{items.content}</h6>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
