import React from "react";
import { BiArchiveIn } from "react-icons/bi";
import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Mail = () => {
  const navigate = useNavigate();
 
  const iconsButton = [
    { icon: <IoMdArrowBack size={"20px"} />, function:()=>navigate('/inbox')},
    { icon: <BiArchiveIn size={"20px"} /> },
    { icon: <MdOutlineReport size={"20px"} /> },
    { icon: <MdDeleteOutline size={"20px"} /> },
    { icon: <MdOutlineMarkEmailUnread size={"20px"} /> },
    { icon: <MdOutlineWatchLater size={"20px"} /> },
    { icon: <MdOutlineAddTask size={"20px"} /> },
    { icon: <MdOutlineDriveFileMove size={"20px"} /> },
    { icon: <IoMdMore size={"20px"} /> },
  ];
 
  return (
    <div className="flex-1 bg-white rounded-2xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-1 text-gray-700 py-2">
          {iconsButton.map((item, index) => (
            <div
              key={index}
              onClick={item.function}
              className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-1000 ease-in-out"
            >
              {item.icon}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
            <button className="rounded-full p-1 hover:bg-gray-100 transition-all duration-1000 ease-in-out"> <MdKeyboardArrowLeft size={'24px'}/></button>
            <button className="rounded-full p-1 hover:bg-gray-100 transition-all duration-1000 ease-in-out"> <MdKeyboardArrowRight size={'24px'}/></button>
        </div>
      </div>
      <div className="h-[75vh] overflow-y-auto p-4">
        <div className="flex items-center justify-between bg-white gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">Subject</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">inbox</span>
          </div>
          <div className="flex-none text-gray-400 my-5 text-sm">
            <p>12-08-2024</p>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <h1>gautam@gmail.com</h1>
          <span>to me</span>
        </div>
        <div className="my-10">
          <p>Message</p>
        </div>
      </div>
    </div>
  );
};

export default Mail;
