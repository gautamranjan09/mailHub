import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";

const mailType = [
  {
    icon: <MdInbox size={"20px"} />,
    text: "Primary",
  },
  {
    icon: <GoTag size={"20px"} />,
    text: "Promotions",
  },
  {
    icon: <FaUserFriends size={"20px"} />,
    text: "Social",
  },
];
const UiEmailTypeBody = () => {
  const [mailTypeSelected, setMailTypeSelected] = useState("Primary");
  return (
    <>
      {" "}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div className="flex items-center gap-1">
            <DropdownMenu />
          </div>
          <div className="p-2 rounded-full hover:bg-teal-200/30 transition-all duration-500 ease-in-out hover:rotate-12">
            <IoMdRefresh size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">1-50 of 1000</p>
          <button className="rounded-full p-1 hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
            {" "}
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button className="rounded-full p-1 hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
            {" "}
            <MdKeyboardArrowRight size={"24px"} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {mailType.map((item, index) => (
          <button
            className={`${mailTypeSelected === item.text ? "border-b-4 border-b-blue-600 text-blue-600" : ""} flex items-center gap-5 p-4 w-52 hover:bg-teal-200/30 transition-all duration-1000 ease-in-out`}
            key={item.text}
            onClick={() => setMailTypeSelected(item.text)}
          >
            {item.icon} <span>{item.text}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default UiEmailTypeBody;