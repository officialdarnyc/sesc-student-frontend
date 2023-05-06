import { useState, useContext, createContext, useEffect } from "react";
import { getCourses } from "../services/dashboardService";
import { NETWORK_STATE } from "../utils/authDefinitions";
import { useNavigate } from "react-router-dom";


const PortalContext = createContext();

export const PortalProvider = ({ children }) => {

  const navigate = useNavigate()

  const [courses, setCourses] = useState(null);
  const [overview, setOverview] = useState({});
  const [status, setStatus] = useState(NETWORK_STATE.IDLE);

  const [activeNav, setactiveNav] = useState("DASHBOARD");

  const handleActiveNav = (active) => {
    setactiveNav(active);
  };

  const fetchCourses = async (data) => {
    try {
      setStatus(NETWORK_STATE.LOADING);
      const cachedCourses = localStorage.getItem("courses");
      if (cachedCourses) {
        setCourses(JSON.parse(cachedCourses));
        setStatus(NETWORK_STATE.SUCCESS);
      }
      setCourses(data);

      setStatus(NETWORK_STATE.SUCCESS);
    } catch (err) {
      setStatus(NETWORK_STATE.ERROR);
      navigate("/login");
    }
  };
  const handleOverview = (data) => {
    setOverview(data)
  }




  return (
    <PortalContext.Provider
      value={{ activeNav, handleActiveNav,courses,fetchCourses,status, setStatus,handleOverview,overview }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => useContext(PortalContext);
