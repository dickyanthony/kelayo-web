import React from "react";
import { useMediaQuery } from "react-responsive";

const WrapCenter = ({ children }) => {
  const medium = useMediaQuery({ maxWidth: "671px" });
  return (
    <div className="container h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default WrapCenter;
