import React from "react";
import { useMediaQuery } from "react-responsive";

const WrapCenter = ({ children }) => {
  const medium = useMediaQuery({ maxWidth: "671px" });
  return (
    <div
      className="flex justify-center items-center h-full w-full"
      style={
        medium
          ? {
              position: "absolute",
              left: "50%",
              top: "50%",
            }
          : {
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }
      }
    >
      {children}
    </div>
  );
};

export default WrapCenter;
