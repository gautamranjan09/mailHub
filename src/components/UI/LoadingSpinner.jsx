// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-24 h-24 border-[6px] border-[#2dd4bf] border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
