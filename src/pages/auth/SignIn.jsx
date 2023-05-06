import React, { useState } from "react";
import cap from "../../assets/auth/cap.svg";
import user from "../../assets/auth/user.svg";
import lock from "../../assets/auth/lock.svg";

import { Link, useNavigate } from "react-router-dom";
import {  Field, Form, Formik } from "formik";
import {
  alertError,
  alertSuccess,
  NETWORK_STATE,
} from "../../utils/authDefinitions";
import { signin } from "../../services/authService";
import { useAuth } from "../../context/authContext";
import { usePortal } from "../../context/portalContext";



import * as Yup from "yup";

function SignIn() {



 


  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(NETWORK_STATE.IDLE);
  const navigate = useNavigate();

  const auth = useAuth();
      




  const handleLogin = async (values, methods) => {
    try {
      setStatus(NETWORK_STATE.LOADING);
      const response = await signin(values);

      setStatus(NETWORK_STATE.SUCCESS);
      if (response.data.success && !response.data.data) {
        alertError(response.data.message);
        return;
      }
      auth.initUser(response.data.data);





      navigate("/");
      alertSuccess("Logged in successfully");
    } catch (err) {
      alertError(
        err?.response?.data?.message || "Something went wrong, try again"
      );
      setStatus(NETWORK_STATE.ERROR);
    }
  };

  document.title = "eportal | Login";
  return (
    <body className="bg-[#006E90] text-white px-[34px] pt-[23px] pb-[55px] flex flex-col items-center rounded-[10px] shadow-2xl ">
      <img src={cap} alt="" />
      <h1 className="font-semibold text-[55px] mb-[24px] ">STUDENT PORTAL</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().min(3, "Minimum of 3"),
        })}
        onSubmit={(values, methods) => {
          handleLogin(values, methods);
        }}
      >
            {({ isSubmitting, errors, ...rest }) => (

        <Form className="flex flex-col  w-full">
          <div className="w-full mb-[24px] relative">
            <Field
              required
              type="email"
              placeholder="Enter your email address"
              name="email"
              className="h-[50px] bg-inherit  border border-white  rounded-[5px] pl-[50px] w-full "
            />
            <img
              src={user}
              alt=""
              className="absolute left-[10px] top-[13px]"
            />
          </div>
          <div className="w-full  mb-[31px] relative ">
            <Field
              required
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              name="password"
              className="h-[50px] bg-inherit border border-white rounded-[5px] pl-[50px] w-full "
            />
            <img
              src={lock}
              alt=""
              className="absolute left-[10px] top-[13px]"
            />
          </div>
          <div className="flex items-center justify-between mb-[22px] font-semibold">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember me</label>
            </div>
            <Link
              to={"/forgotpassword"}
              className="text-[#F18F01] hover:text-opacity-75 "
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={status == NETWORK_STATE.LOADING}
            className="bg-[#ffffff] text-[#006E90] h-[50px] rounded-[5px] mb-[28px] font-semibold hover:bg-opacity-75"
          >
            Log in
          </button>
        </Form>
            )}

      </Formik>
      <p className="font-medium">
        Don't have an account?{" "}
        <Link to={"/signup"} className="text-[#F18F01] hover:text-opacity-75 ">
          Register here
        </Link>
      </p>
    </body>
  );
}

export default SignIn;
