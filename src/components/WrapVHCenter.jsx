// import React from "react";
// import { useMediaQuery } from "react-responsive";

const WrapVHCenter = ({ children }) => {
  // const medium = useMediaQuery({ maxWidth: "671px" });
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default WrapVHCenter;
