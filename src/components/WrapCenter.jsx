import React from "react";

const WrapCenter = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      {children}
    </div>
  );
};

export default WrapCenter;
