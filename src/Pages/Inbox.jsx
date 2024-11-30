import React, { useEffect, useState } from "react";

import Messages from "../components/Mail/Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMailPath } from "../redux/navSlice";
import UiEmailTypeBody from "../components/UI/UiEmailTypeBody";


const Inbox = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSelectedMailPath('inbox'));
  },[]);

  return (
    <div className="flex-1  bg-white/70 rounded-2xl mx-5">
      <UiEmailTypeBody/>
      <div className="h-[69vh] overflow-y-auto">
        <Messages/>
      </div>
    </div>
  );
};

export default Inbox;
