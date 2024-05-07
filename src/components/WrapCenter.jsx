import React from "react";

const WrapCenter = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">{children}</div>
  );
};

export default WrapCenter;
