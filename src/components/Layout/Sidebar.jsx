import React, { memo, useMemo, useState } from "react";
import { BiSolidInbox } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/appSlice";
import { BsMailbox2, BsTrash } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.appSlice.showSidebar);
  const mailCount = useSelector((state) => state.navSlice.mailCount);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const mainSidebarItems = [
    {
      icon: <BiSolidInbox size={"20px"} />,
      text: "Inbox",
      to: "/inbox",
      count: mailCount,
    },
    {
      icon: <IoMdStar size={"20px"} />,
      text: "Starred",
      to: "/starred",
    },
    {
      icon: <TbSend2 size={"20px"} />,
      text: "Sent",
      to: "/sent",
    },
    {
      icon: <BsTrash size={"20px"} />,
      text: "Trash",
      to: "/trash",
    },
    {
      icon: <BsMailbox2 size={"20px"} />,
      text: "All Mails",
      to: "/allmails",
    },
  ];

  const moreSidebarItems = [
    {
      icon: <MdOutlineDrafts size={"20px"} />,
      text: "Draft",
      to: "/draft",
    },
    {
      icon: <MdOutlineWatchLater size={"20px"} />,
      text: "Snoozed",
      to: "/snoozed",
    },
  ];

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  return (
    <>
      <div className="p-3 pt-1">
        <button onClick={() => dispatch(setOpen(true))} className={`flex shadow-lg items-center gap-2 p-4 rounded-2xl hover:shadow-xl hover:scale-105 bg-rose-300/70 transition-all duration-200 ease-in-out active:scale-95 `}>
          <LuPencil size={"20px"} /> Compose
        </button>
      </div>
      <div className="text-gray-500">
        {
          mainSidebarItems.map((item, index) => {
            return (
              <NavLink
                to={item.to}
                style={{ "--delay": `${index * 350}ms` }}
                key={item.to}
                className={({ isActive }) =>
                  `${isActive ? "bg-rose-300/50 text-black" : "hover:bg-teal-300/30"} flex items-center justify-between gap-4 pl-6 py-1 rounded-r-full cursor-pointer my-2 transition-all duration-1000 ${
                    showSidebar ? `animate-bounceIn opacity-0 [animation-delay:var(--delay)]` : `animate-slideOut opacity-0 duration-1000`
                  }`
                }
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <p>{item.text}</p>
                </div>
                {item.count !== 0 && <span className="text-sm font-medium px-2.5 py-0.5 rounded-full">{item.count}</span>}
              </NavLink>
            );
          })}

        {/* More Dropdown */}
        {showSidebar && (<div className={`duration-1000 ${showSidebar && `animate-bounceIn opacity-0 [animation-delay:1750ms]`}`}>
          <div
            onClick={toggleMoreDropdown}
            className={`flex items-center justify-between gap-4 pl-6 py-1 rounded-r-full cursor-pointer my-2 hover:bg-teal-300/30 transition-all `}
          >
            <div className="flex items-center gap-4">
              <MdOutlineKeyboardArrowDown size={"20px"} className={`transition-transform duration-300 ${isMoreDropdownOpen ? "rotate-180" : ""}`} />
              <p>{isMoreDropdownOpen ? "Less" :"More"}</p>
            </div>
          </div>
        
        {isMoreDropdownOpen &&
          moreSidebarItems.map((item, index) => (
            <NavLink
              to={item.to}
              key={item.to}
              style={{ "--delay": `${index * 350}ms ` }}
              className={({ isActive }) =>
                `${isActive ? "bg-rose-300/50 text-black" : "hover:bg-teal-300/30"} 
                  flex items-center justify-between gap-4 pl-12 py-1 rounded-r-full cursor-pointer my-2 
                  transition-all [animation-delay:var(--delay)] animate-slideDown opacity-0`
              }
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <p>{item.text}</p>
              </div>
            </NavLink>
          ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
