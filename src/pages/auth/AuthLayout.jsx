import React from "react";
import bg from "../../assets/auth/bg.jpg";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-screen object-cover flex justify-center items-center relative  ">
      <div
        className="absolute top-0 left-0 w-screen h-screen  blur-sm z-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default AuthLayout;
