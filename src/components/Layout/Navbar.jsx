import React, { useEffect, useMemo, useState } from "react";
import Avatar from "react-avatar";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbGridDots } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setShowSidebar, setSignedIn, setUser } from "../../redux/appSlice";
import ProfilePopup from "./ProfilePopup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useStripHTML } from "../hooks/useStripHTML";
import { setMailCount } from "../../redux/navSlice";

const Navbar = () => {
  const searchText = useSelector((state) => state.appSlice.searchText);
  const emails = useSelector((state) => state.appSlice.emails);
  const profile = useSelector((state) => state.appSlice.profile);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/allmails") {
      setInput("");
      dispatch(setSearchText(""));
    }
  }, [location]);

  useMemo(()=>{
   if(searchText !== "") navigate("/allmails")
  },[searchText]);

  // Close profile popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileSection = document.getElementById("profile-section");
      if (profileSection && !profileSection.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Profile handlers
  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    // Implement your logout logic here
    try {
      await signOut(auth);
      dispatch(setUser(""));
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setMailCount(0));
      setIsProfileOpen(false);
    }
  };

  const handleProfileSettings = () => {
    // Implement your profile settings logic here
    navigate("/userprofile");
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input && showSuggestions) {
        // Only show suggestions if showSuggestions is true
        const filteredSuggestions = emails
          ?.filter((email) => {
            const lowerCaseInput = input.toLowerCase();
            return email?.subject?.toLowerCase().includes(lowerCaseInput) || email?.to?.toLowerCase().includes(lowerCaseInput) || email?.from?.toLowerCase().includes(lowerCaseInput) || email?.message?.toLowerCase().includes(lowerCaseInput);
          })
          .map((email) => ({
            id: email.id,
            subject: email.subject,
            to: email.to,
            from: email.from,
            message: email.message,
            createdAt: email.createdAt,
          }));

        setSuggestions(filteredSuggestions.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input, emails, showSuggestions]); // Added showSuggestions to dependencies

  const handleSuggestionClick = (suggestion) => {
    dispatch(setSearchText(suggestion));
    setInput(suggestion.subject);
    setShowSuggestions(false); // Hide suggestions after clicking
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    setShowSuggestions(true); // Show suggestions when typing
    if (newValue === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      dispatch(setSearchText(""));
    }
  };

  const handleSearchIconClick = () => {
    if (input.trim()) {
      dispatch(setSearchText(input));
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // //Handle clicking outside of suggestions to close them
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!event.target.closest(".search-container")) {
  //       setShowSuggestions(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-6">
          <div onClick={() => dispatch(setShowSidebar())} className="p-3 rounded-full hover:bg-teal-100 cursor-pointer transition-all duration-1000 ease-in-out">
            <RxHamburgerMenu size={"20px"} />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <img className="w-7" src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="gmail-logo" />
            <h1 className="text-2xl text-gray-500 font-normal">MailHub</h1>
          </div>
        </div>
      </div>
      <div className="md:block hidden w-[50%] relative search-container">
        <div className="flex justify-center items-center w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchIconClick();
            }}
            className="flex items-center bg-teal-300/30 px-1 py-1 rounded-full focus-within:bg-white focus-within:shadow-lg transition-all duration-300 ease-in-out w-[60%] focus-within:w-[100%]"
          >
            <button type="submit" className="flex items-center w-9 h-9 justify-center rounded-full hover:bg-rose-300/30 cursor-pointer transition-all duration-300 ease-in-out">
              <IoIosSearch className="text-gray-700 " size={"22px"} />
            </button>
            <input
              type="search"
              value={input}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Show suggestions when input is focused
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchIconClick();
                }
              }}
              placeholder="Search Mail"
              className="rounded-full w-full bg-transparent outline-none px-1 placeholder:text-gray-500"
            />
          </form>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="flex flex-col px-4 py-1 border-b hover:bg-teal-200/30 transition-colors duration-200 cursor-pointer" onClick={(e) => handleSuggestionClick(suggestion)}>
                <div className="flex justify-between">
                  <div>
                    <div className="text-gray-800 font-semibold truncate w-96">{suggestion.subject}</div>
                    <div className="text-gray-400/60 text-xs"> (To: {suggestion.to})</div>
                    <div className="text-gray-400/60 text-xs"> (From: {suggestion.from})</div>
                  </div>
                  <div className="text-gray-400 text-xs">{suggestion.createdAt}</div>
                </div>
                <div className="text-gray-700 text-sm mt-1 truncate w-auto">{useStripHTML(suggestion.message)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="md:block hidden">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-teal-100 cursor-pointer transition-all duration-1000 ease-in-out">
            <CiCircleQuestion size={"22px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-teal-100 cursor-pointer transition-all duration-1000 ease-in-out hover:rotate-90">
            <IoSettingsOutline size={"22px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-teal-100 cursor-pointer transition-all duration-1000 ease-in-out">
            <TbGridDots size={"22px"} />
          </div>
          <div id="profile-section" className="relative">
            <div onClick={handleProfileClick} className="cursor-pointer rounded-full hover:scale-110 bg-gray-400 transition-all duration-1000 ease-in-out">
              <Avatar src={profile?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7oMra0QkSp_Z-gShMOcCIiDF5gc_0VKDKDg&s"} size="35" round={true} />
            </div>

            <ProfilePopup isOpen={isProfileOpen} onClose={handleProfileClose} onLogout={handleLogout} onProfile={handleProfileSettings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
