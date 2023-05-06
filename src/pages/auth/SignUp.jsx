import { useState, useEffect } from "react";
import cap from "../../assets/auth/cap.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signup } from "../../services/authService";
import * as Yup from "yup";
import {
  alertError,
  containsSpecialChars,
  NETWORK_STATE,
} from "../../utils/authDefinitions";
import { toast, Slide } from "react-toastify";
import { usePortal } from "../../context/portalContext";

function SignUp() {
  const navigate = useNavigate();

  const [allPassed, setAllPassed] = useState(false);
  const [errorMessage, setErrrorMessage] = useState("");
  const [paswordStatus, setPasswordStatus] = useState(false);
  const [status, setStatus] = useState(NETWORK_STATE.IDLE);
  const ErrorText = (props) => {
    return <div className="flex gap-2">{props.text}</div>;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(<ErrorText text="Invalid email address." />)
        .required(<ErrorText text="Email is required." />),
      firstName: Yup.string()
        .min(3, <ErrorText text="Minimum of 3." />)
        .required(<ErrorText text="Firstname is required." />),
      lastName: Yup.string()
        .min(3, <ErrorText text="Minimum of 3." />)
        .required(<ErrorText text="Lastname is required." />),
    }),

    onSubmit: async (values) => {
      handleSignup(values);
    },
  });

  useEffect(() => {
    setAllPassed(false);
    formik.values.password &&
      /[a-z]/.test(formik.values.password) &&
      /[A-Z]/.test(formik.values.password) &&
      /[0-9]/.test(formik.values.password) &&
      containsSpecialChars(formik.values.password) &&
      formik.values.password.length > 7 &&
      setAllPassed(true);
  }, [formik?.values?.password, formik?.values?.confirmPassword]);

  const handleSignup = async (values) => {
    try {
      setStatus(NETWORK_STATE.LOADING);
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      const response = await signup(userData);
      setStatus(NETWORK_STATE.SUCCESS);
      toast.success(response.data.message, {
        transition: Slide,
        position: toast.POSITION.TOP_CENTER,
      });

      navigate("/login");
    } catch (err) {
      setErrrorMessage(err.response.data.message);
      setStatus(NETWORK_STATE.ERROR);
      alertError(err.message);
    }
  };
  useEffect(() => {
    if (formik.values.confirmPassword !== formik.values.password) {
      setErrrorMessage("passwords does not match");
    }
  }, []);

  return (
    <div className="bg-[#006E90] text-white px-[34px] pt-[23px] pb-[25px] flex flex-col items-center rounded-[10px] shadow-2xl ">
      <img src={cap} alt="" className="w-[56px] h-[46px] " />
      <h1 className="font-semibold text-[30px] mb-[20px] ">STUDENT PORTAL</h1>
      <p className="self-start font-medium text-xl mb-[17px] ">
        Create Account
      </p>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col  w-full gap-[17px] "
      >
        <div className="flex w-full justify-between gap-[20px]">
          <div className="relative">
            <label
              htmlFor=""
              className="absolute text-white/75 left-[10px] text-xs pt-1 pb-2 "
            >
              FIRST NAME
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-inherit border border-white h-[50px] rounded-[5px] pl-[10px]  pt-6 pb-2"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="relative">
            <label
              htmlFor=""
              className="absolute text-white/75 left-[10px] text-xs pt-1 pb-2 "
            >
              LAST NAME
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-inherit border border-white h-[50px] rounded-[5px] pl-[10px]  pt-6 pb-2 "
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500">{formik.errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className="relative w-full">
          <label
            htmlFor=""
            className="absolute text-white/75 left-[10px] text-xs pt-1 pb-2 "
          >
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-inherit border border-white h-[50px] rounded-[5px] pl-[10px] w-full  pt-6 pb-2"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="relative w-full">
          <label
            htmlFor=""
            className="absolute text-white/75 left-[10px] text-xs pt-1 pb-2 "
          >
            PASSWORD
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-inherit border border-white h-[50px] rounded-[5px] pl-[10px] w-full pt-6 pb-2"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="relative w-full">
          <label
            htmlFor=""
            className="absolute text-white/75 left-[10px] text-xs pt-1 pb-2 "
          >
            CONFIRM PASSWORD
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-inherit border border-white h-[50px] rounded-[5px] pl-[10px] w-full pt-6 pb-2"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={
            status == NETWORK_STATE.LOADING ||
            !/[a-z]/.test(formik.values.password) ||
            !/[A-Z]/.test(formik.values.password) ||
            !containsSpecialChars(formik.values.password) ||
            !/[0-9]/.test(formik.values.password) ||
            formik.values.password !== formik.values.confirmPassword
          }
          className="bg-[#ffffff] text-[#006E90] h-[50px] rounded-[5px] mb-[28px] font-semibold hover:bg-opacity-75"
        >
          {status == NETWORK_STATE.LOADING ? "Creating..." : "Create account"}
        </button>
      </form>
      {errorMessage && (
        <div className="bg-red-600 px-8 py-2">
          {}
          {errorMessage}
        </div>
      )}

      <p className="font-medium">
        Already a student?{" "}
        <Link to={"/login"} className="text-[#F18F01] hover:text-opacity-75 ">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
