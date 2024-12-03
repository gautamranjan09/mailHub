import React, { useEffect, useState } from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine, RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStripHTML } from "../hooks/useStripHTML";
import { IoMdCheckboxOutline } from "react-icons/io";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { setSelectedEmailsArray } from "../../redux/appSlice";
import { TbTrashX } from "react-icons/tb";

const Message = ({ email, index }) => {
  const selectedMailPath = useSelector((state) => state.navSlice.selectedMailPath);
  const selectedEmailsArray = useSelector((state) => state.appSlice.selectedEmailsArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectSquare, setSelectSquare] = useState(false); // for selecting a particular box

  useEffect(() => {
    if (selectedEmailsArray.includes(email)) {
      setSelectSquare(true);
    } else {
      setSelectSquare(false);
    }
  }, [selectedEmailsArray]);

  const handleSelectedEmail = (event) => {
    event.stopPropagation();
    //setSelectSquare(!selectSquare);
    if (selectSquare === true) {
      setSelectSquare(false);
      const updatedArray = selectedEmailsArray.filter((currentEmail) => currentEmail.id !== email.id);
      dispatch(setSelectedEmailsArray(updatedArray));
    } else {
      setSelectSquare(true);
      dispatch(setSelectedEmailsArray([...selectedEmailsArray, email]));
    }
  };

  const handleSelectedStarredEmail = async (event) => {
    event.stopPropagation();
    const starredStatus = email?.starred ? false : true;
    try {
      await updateDoc(doc(db, "emails", email.id), {
        starred: starredStatus,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectedTrashedEmail = async (event) => {
    event.stopPropagation();
    const trashedStatus = email?.trashed ? false : true;
    try {
      await updateDoc(doc(db, "emails", email.id), {
        trashed: trashedStatus,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openMail = () => {
    navigate(`/${selectedMailPath}/${email.id}`);
  };

  return (
    <div
      onClick={openMail}
      style={{ "--delay": `${index * 100}ms` }}
      className="flex items-center justify-between border-b border-gray-200 px-4 text-sm cursor-pointer  hover:shadow-md hover:translate-y-1 hover:bg-rose-300/40 transition-all duration-1000 ease-in-out animate-slideUp opacity-0 [animation-delay:var(--delay)]"
    >
      <div className="flex items-center gap-1">
        <div className="flex-none text-gray-300 px-1 py-2" onClick={handleSelectedEmail}>
          {selectSquare ? <IoMdCheckboxOutline className="w-5 h-5 text-teal-400" /> : <MdCropSquare className="w-5 h-5" />}
          {/* {improve} */}
        </div>
        <div className="flex-none text-gray-300 px-1 py-2" onClick={handleSelectedStarredEmail}>
          {email?.starred ? <RiStarSFill className="w-5 h-5 text-teal-400" /> : <RiStarLine className="w-5 h-5" />}
        </div>
        <div className="flex-none text-gray-300 px-1 py-2" onClick={handleSelectedTrashedEmail}>
          {email?.trashed ? <TbTrashX className="w-5 h-5 text-rose-600 hover:text-teal-400" /> : <TbTrashX className="w-5 h-5 hover:text-rose-600" />}
        </div>
      </div>
      <div className="flex-1 ml-4 flex items-center">
        <p className="text-black font-bold  w-72">{(selectedMailPath !== "sent" && email?.from) || (selectedMailPath === "sent" && email?.to)}</p>
        <p className="text-gray-600 truncate inline-block w-[32rem]">
          <strong>{email?.subject}</strong>-{useStripHTML(email?.message)}
        </p>
      </div>
      <div className="flex-none text-gray-400 text-sm">
        <p>{email?.createdAt}</p>
      </div>
    </div>
  );
};

export default Message;
