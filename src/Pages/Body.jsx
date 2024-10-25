import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import { Outlet } from "react-router-dom";
import SendMail from "../components/ComposeMail/SendMail";


const Body = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
