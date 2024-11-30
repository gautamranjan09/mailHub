import React, { useEffect, useState } from "react";

import Messages from "../components/Mail/Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMailPath } from "../redux/navSlice";
import UiEmailTypeBody from "../components/UI/UiEmailTypeBody";

const Sent = () => {
  const dispatch = useDispatch();
  const [noOfMailOnCurrPage, setNoOfMailOnCurrPage] = useState(0); // this is for the pagination

  useEffect(() => {
    dispatch(setSelectedMailPath("sent"));
  }, []);

  return (
    <div className="flex-1  bg-white/70 rounded-2xl mx-5">
      <UiEmailTypeBody setNoOfMailOnCurrPage={setNoOfMailOnCurrPage} noOfMailOnCurrPage={noOfMailOnCurrPage} />
      <div className="h-[69vh] overflow-y-auto">
        <Messages noOfMailOnCurrPage={noOfMailOnCurrPage} />
      </div>
    </div>
  );
};

export default Sent;
