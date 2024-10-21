import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import SendMail from "./SendMail";


const Body = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
