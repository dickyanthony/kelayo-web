// import React from "react";
// import { useMediaQuery } from "react-responsive";

const WrapVHCenterXL = ({ children, className = "" }) => {
  // const medium = useMediaQuery({ maxWidth: "671px" });
  return (
    <div className={`w-full h-auto flex justify-center ${className}`}>
      <div className="max-w-screen-xl flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default WrapVHCenterXL;
