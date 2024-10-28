import React from "react";
import { BiSolidInbox } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setOpen } from "../../redux/appSlice";
import { BsTrash } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const sidebarItems = [
  {
    icon: <BiSolidInbox size={"20px"} />,
    text: "Inbox",
    to: "/inbox",
    count:23,
  },
  {
    icon: <IoMdStar size={"20px"} />,
    text: "Starred",
    to: "/starred"
  },
  {
    icon: <MdOutlineWatchLater size={"20px"} />,
    text: "Snoozed",
    to: "/snoozed"
  },
  {
    icon: <TbSend2 size={"20px"} />,
    text: "Sent",
    to: "/sent"
  },
  {
    icon: <MdOutlineDrafts size={"20px"} />,
    text: "Draft",
    to: "/draft"
  },
  {
    icon: <BsTrash size={"20px"} />,
    text: "Trash",
    to: "/trash"
  },
  {
    icon: <MdOutlineKeyboardArrowDown size={"20px"} />,
    text: "More",
    to: "/more"
  },
];

const Sidebar = () => {
  const dispatch =useDispatch();

  return (
    <>
      <div className="p-3 pt-1">
        <button onClick={()=> dispatch(setOpen(true))} className="flex items-center gap-2 p-4 rounded-2xl hover:shadow-lg hover:scale-105 bg-rose-300/70 transition-all duration-200 ease-in-out active:scale-95">
          <LuPencil size={"20px"} /> Compose
        </button>
      </div>
      <div className="text-gray-500">
        {sidebarItems.map((item, index) => {
          return (
            <NavLink to={item.to} key={Math.random()} className={({ isActive })=> `${isActive ? "bg-rose-300/50 text-black":"hover:bg-teal-300/30"} flex items-center justify-between gap-4 pl-6 py-1 rounded-r-full cursor-pointer my-2 transition-all duration-1000`}>
              <div className="flex items-center gap-4">
              {item.icon}
              <p>{item.text}</p>
              </div>
              {item.count && (<span className="text-sm font-medium px-2.5 py-0.5 rounded-full">{item.count}</span>)}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
