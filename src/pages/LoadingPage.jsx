import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-[100wh] h-[100vh] flex justify-center items-center">
      <span className="relative flex h-16 w-16">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-16 w-16 bg-primary"></span>
      </span>
    </div>
  );
};

export default LoadingPage;
