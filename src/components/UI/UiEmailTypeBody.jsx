import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { FaTrash, FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setSelectedEmailsArray } from "../../redux/appSlice";

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
const UiEmailTypeBody = ({ setNoOfMailOnCurrPage, noOfMailOnCurrPage }) => {
  const [mailTypeSelected, setMailTypeSelected] = useState("Primary");
  const selectedEmailsArray = useSelector((state) => state.appSlice.selectedEmailsArray);
  const totalNumOfMails = useSelector((state) => state.navSlice.totalNumOfMails);
  const dispatch = useDispatch();

  const nextPage = () => {
    if (totalNumOfMails - noOfMailOnCurrPage > 20) setNoOfMailOnCurrPage((prevNoOfMailOnCurrPage) => prevNoOfMailOnCurrPage + 20);
  };

  const prevPage = () => {
    if (noOfMailOnCurrPage > 0) setNoOfMailOnCurrPage((prevNoOfMailOnCurrPage) => prevNoOfMailOnCurrPage - 20);
  };

  const handleTrashEmail = async() => {
    // handle trash email logic here
    
    const updatedEmailPromise=  selectedEmailsArray.map((email)=>{
      const trashStatus = email?.trashed ? false : true;
      try{
        const deletePromise = updateDoc(doc(db, "emails", email.id),{
           trashed: trashStatus
         })
         return deletePromise;
       }catch(error){
         toast.error(error.message);
       } 
    });

    // Wait for all actions to complete
    await Promise.all(updatedEmailPromise);
    dispatch(setSelectedEmailsArray([]));
    toast.success( "Email successfully moved to trash!");
  }

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
          {selectedEmailsArray.length > 0 && <div onClick={handleTrashEmail} className="p-2 rounded-full hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
            <FaTrash size={"16px"} />
          </div>}
          <div className="p-2 rounded-full hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">{`${totalNumOfMails && noOfMailOnCurrPage + 1} - ${noOfMailOnCurrPage + 20 > totalNumOfMails ? totalNumOfMails : noOfMailOnCurrPage + 20} of ${totalNumOfMails}`}</p>
          <button onClick={prevPage} className="rounded-full p-1 hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
            {" "}
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button onClick={nextPage} className="rounded-full p-1 hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
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
