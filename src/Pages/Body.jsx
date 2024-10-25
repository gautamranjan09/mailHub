import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import { useSelector } from "react-redux";
import Navbar from "../components/Layout/Navbar";

const Body = () => {
  const { showSidebar } = useSelector((state) => state.appSlice);

  return (
    <div className="flex">
     
      {/* Adjust the width and overflow */}
      <div className={`transition-all duration-1000 ease-in-out ${showSidebar ? "w-[13%]" : "w-0 overflow-hidden"}`}>
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
