import React, { useEffect, useRef, useState } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setSelectedEmailsArray } from "../../redux/appSlice";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const totalMailsInPath = useSelector(state => state.navSlice.totalMailsInPath);
  const dispatch = useDispatch();
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsActive(false); // Reset background color when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
    setIsActive((prevState) => !prevState);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsActive(false); // Reset background color when selecting an option

    if (option === "All") dispatch(setSelectedEmailsArray([...totalMailsInPath]));
    else if (option === "None") dispatch(setSelectedEmailsArray([]));
    else if (option === "Starred"){
      const starredMails = totalMailsInPath.filter(mail => mail.starred);
      dispatch(setSelectedEmailsArray(starredMails));
    } 
    else if (option === "Unstarred"){
      const unstarredMails = totalMailsInPath.filter(mail => !mail.starred);
      dispatch(setSelectedEmailsArray(unstarredMails));
    }
    else if (option === "Read"){
      const readMails = totalMailsInPath.filter(mail => mail?.read);
      dispatch(setSelectedEmailsArray(readMails));
    }
    else if (option === "Unread"){
      const unreadMails = totalMailsInPath.filter(mail => !mail?.read);
      dispatch(setSelectedEmailsArray(unreadMails));
    }
  };

  const  handleCheckboxClick = () => {
    setIsCheckboxClicked((prevState) => !prevState);
  }


  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className={`flex rounded-md ${
          isActive ? "bg-gray-300" : ""
        } transition-colors duration-1000 cursor-pointer`}
      >
        <div className="flex items-center">
          <button onClick={handleCheckboxClick} className="px-1 rounded-sm border-none bg-transparent cursor-pointer py-1 hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
            {/* <input
              type="checkbox"
              onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
            /> */}
            {!isCheckboxClicked && <BiCheckbox size={"22px"}/>}
            {isCheckboxClicked && <BiCheckboxChecked size={"22px"}/>}
          </button>
          <button
            onClick={toggleDropdown}
            className="rounded-sm border-none bg-transparent cursor-pointer py-2 hover:bg-teal-200/30 transition-all duration-500 ease-in-out"
          >
            <FaCaretDown />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-36 rounded-lg shadow-xl bg-white ring-2 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {["All", "None", "Read", "Unread", "Starred", "Unstarred"].map(
              (option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-200/30 transition-all duration-1000 ease-in-out"
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
