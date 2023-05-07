import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import avatar from "../../assets/dash/avatar1.png";
import { getProfile } from "../../services/authService";
import { editProfile } from "../../services/authService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { student, setStudent } = useAuth();
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [reload, setReload] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const fetchProfile = async () => {
    setIsLoading(true);
    const studentprofile = await getProfile(student.externalStudentId);
    setProfile(studentprofile.data.data);
    setIsLoading(false);
  };
  const navigateHome = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchProfile();
  }, [isAllowed, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAllowed(false);
    setIsLoading(true);
    try {
      const editedProfile = await editProfile(student.externalStudentId, {
        firstName: !formData.firstName ? profile.firstName : formData.firstName,
        lastName: !formData.lastName ? profile.lastName : formData.lastName,
      });

      setIsAllowed(true);

      toast.success(editedProfile.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }

    setIsAllowed(false);

    setIsLoading(false);
    setFormData({
      firstName: "",
      lastName: "",
    });
  };

  useEffect(() => {
    let studentData = JSON.parse(localStorage.getItem("student"));
    studentData.firstName = profile.firstName;
    studentData.lastName = profile.lastName;
    localStorage.setItem("student", JSON.stringify(studentData));
    setStudent(studentData);
  }, [isAllowed, isLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="flex flex-col justify-center py-8">
      <div className="flex justify-start">
        {/* <h1 className="text-bold text-white text-lg">Profile</h1> */}
      </div>
      <div className="w-[650px]   ">
        <div className="flex justify-between items-center">
          <form
            onSubmit={handleSubmit}
            action=""
            className="gap-[12px] flex  w-[400px] flex-wrap mt-8"
          >
            <label class="block">
              <span class="after:content-['*'] after:ml-0.5 after:text-blue-500 block text-sm font-medium text-white">
                FIRST NAME
              </span>
              <input
                type="text"
                name="firstName"
                class="mt-1 px-3 py-2 bg-[#009CCC] border shadow-sm border-slate-300 placeholder-black focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={formData.firstName}
                placeholder={profile.firstName}
                onChange={handleInputChange}
                style={{ "::placeholder": { color: "black" } }}
              />
            </label>
            <label class="block">
              <span class="after:content-['*'] after:ml-0.5 after:text-blue-500 block text-sm font-medium text-white">
                LAST NAME
              </span>
              <input
                type="text"
                name="lastName"
                class="mt-1 px-3 py-2 bg-[#009CCC] border shadow-sm border-slate-300 placeholder-black focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                value={formData.lastName}
                placeholder={profile.lastName}
                onChange={handleInputChange}
              />
            </label>
            <label class="block">
              <span class="after:content-['*'] after:ml-0.5 after:text-blue-500 block text-sm font-medium text-white">
                EMAIL
              </span>
              <input
                type="text"
                name="email"
                class="mt-1 px-3 py-2 bg-[#009CCC] border shadow-sm border-slate-300 placeholder-black focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 cursor-not-allowed"
                value={profile.email}
              />
            </label>
            <label class="block">
              <span class="after:content-['*'] after:ml-0.5 after:text-blue-500 block text-sm font-medium text-white">
                STUDENT ID
              </span>
              <input
                type="text"
                name="email"
                class="mt-1 px-3 py-2 bg-[#009CCC] border shadow-sm border-slate-300 placeholder-black focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 cursor-not-allowed"
                value={profile.studentId}
              />
            </label>
            <div
              nClick={() => navigateHome()}
              className="flex gap-[12px] mt-[20px] "
            >
              <button
                o
                className={` w-[180px]  border border-2 rounded-md text-white border-white `}
              >
                Edit profile
              </button>
            </div>
          </form>
          <div className="w-[200px] h-[200px] ">
            <img
              src={avatar}
              alt=""
              className="w-[200px] h-[200px] scale-75 border  border-white rounded-full"
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Profile;
