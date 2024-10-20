import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Message = () => {
    const navigate = useNavigate();
    const openMail= () => {
        navigate("/inbox/123456");
    };

  return (
    <div onClick={openMail} className="flex items-start justify-between border-b border-gray-200 px-4 py-2 text-sm cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out">
      <div className="flex items-center gap-3">
        <div className="flex-none text-gray-300">
            <MdCropSquare className='w-5 h-5'/>
        </div>
        <div className="flex-none text-gray-300">
            <RiStarLine className='w-5 h-5'/>
        </div>
      </div>
      <div className="flex-1 ml-4">
            <p className="text-gray-600 truncate inline-block max-w-full">Message 1</p>
        </div>
        <div className="flex-none text-gray-400 text-sm">
            Apna time ayega
        </div>
    </div>
  );
};

export default Message;
