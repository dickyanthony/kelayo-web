// import React from "react";
// import { useMediaQuery } from "react-responsive";

const WrapVHCenter = ({ children, className = "" }) => {
  // const medium = useMediaQuery({ maxWidth: "671px" });
  return (
    <div className={`w-4/5 h-auto flex justify-center ${className}`}>
      <div className="w-4/5 max-w-screen-lg flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default WrapVHCenter;
