import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { FaTrash, FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setSelectedEmailsArray } from "../../redux/appSlice";
import { Tooltip } from "react-tooltip";

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
  const mailsArrToDelPermanent = useSelector((state) => state.appSlice.mailsArrToDelPermanent);
  const selectedMailPath = useSelector((state) => state.navSlice.selectedMailPath);
  const totalNumOfMails = useSelector((state) => state.navSlice.totalNumOfMails);
  const dispatch = useDispatch();

  const nextPage = () => {
    if (totalNumOfMails - noOfMailOnCurrPage > 20) setNoOfMailOnCurrPage((prevNoOfMailOnCurrPage) => prevNoOfMailOnCurrPage + 20);
  };

  const prevPage = () => {
    if (noOfMailOnCurrPage > 0) setNoOfMailOnCurrPage((prevNoOfMailOnCurrPage) => prevNoOfMailOnCurrPage - 20);
  };

  const handleTrashEmail = async () => {
    // Show initial loading toast
    const loadingToast = toast.loading("Moving to trash...");
  
    try {
      // Create update promises with proper async handling
      const updatePromises = selectedEmailsArray.map(async (email) => {
        try {
          await updateDoc(doc(db, "emails", email.id), {
            trashed: true,
          });
          return email.id;
        } catch (error) {
          console.error(`Error moving email to trash ${email.id}:`, error);
          toast.error(`Failed to move email to trash: ${error.message}`);
          throw error;
        }
      });
  
      // Wait for all updates to complete
      await Promise.all(updatePromises);
  
      // Clear selected emails
      dispatch(setSelectedEmailsArray([]));
  
      // Update the loading toast with success message
      toast.update(loadingToast, {
        render: `Email successfully moved to trash!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      // Handle any overall errors
      toast.update(loadingToast, {
        render: `Failed to move emails to trash`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleRestoreEmail = async () => {
    // Show initial loading toast
    const loadingToast = toast.loading("Restoring emails...");
  
    try {
      // Create update promises with proper async handling
      const updatePromises = selectedEmailsArray.map(async (email) => {
        try {
          await updateDoc(doc(db, "emails", email.id), {
            trashed: false,
          });
          return email.id;
        } catch (error) {
          console.error(`Error restoring email ${email.id}:`, error);
          toast.error(`Failed to restore email: ${error.message}`);
          throw error;
        }
      });
  
      // Wait for all updates to complete
      await Promise.all(updatePromises);
  
      // Clear selected emails
      dispatch(setSelectedEmailsArray([]));
  
      // Update the loading toast with success message
      toast.update(loadingToast, {
        render: `Emails restored successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      // Handle any overall errors
      toast.update(loadingToast, {
        render: `Failed to restore emails`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDeleteEmail = async () => {
    // Show initial loading toast
    const loadingToast = toast.loading("Deleting emails...");
  
    try {
      // Create delete promises with proper async handling
      const deletePromises = selectedEmailsArray.map(async (email) => {
        try {
          await deleteDoc(doc(db, "emails", email.id));
          return email.id;
        } catch (error) {
          console.error(`Error deleting email ${email.id}:`, error);
          toast.error(`Failed to delete email: ${error.message}`);
          throw error;
        }
      });
  
      // Wait for all deletions to complete
      await Promise.all(deletePromises);
  
      // Clear selected emails
      dispatch(setSelectedEmailsArray([]));
  
      // Update the loading toast with success message
      toast.update(loadingToast, {
        render: `Emails deleted successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      // Handle any overall errors
      toast.update(loadingToast, {
        render: `Failed to delete emails`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDeletePermanentEmail = async () => {
    // Show initial loading toast
    const loadingToast = toast.loading("Deleting emails...");
  
    try {
      const filteredEmailsToDelete = mailsArrToDelPermanent.filter((email) => 
        selectedEmailsArray.some((itemToDelete) => 
          email?.from === itemToDelete?.from &&
          email?.to === itemToDelete?.to &&
          email?.subject === itemToDelete?.subject &&
          email?.message === itemToDelete?.message
        )
      );
      console.log(selectedEmailsArray, "456", filteredEmailsToDelete);
  
      // Combine and deduplicate emails to delete
      const emailsToDelete = [
        ...selectedEmailsArray,
        ...filteredEmailsToDelete.filter(
          (email) => !selectedEmailsArray.some(
            (selectedEmail) => selectedEmail.id === email.id
          )
        )
      ];

      console.log(emailsToDelete);
      
      // Delete emails
      const deletePromises = emailsToDelete.map(async (email) => {
        try {
          await deleteDoc(doc(db, "emails", email.id));
          return email.id;
        } catch (error) {
          toast.error(`Failed to delete email: ${error.message}`);
          throw error;
        }
      });
  
      // Wait for all deletions to complete
      await Promise.all(deletePromises);
  
      // Clear selected emails
      dispatch(setSelectedEmailsArray([]));
  
      // Update the loading toast with success message
      toast.update(loadingToast, {
        render: `Emails deleted successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      // Handle any overall errors
      toast.update(loadingToast, {
        render: `Failed to delete emails`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

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
          {selectedEmailsArray.length > 0 && selectedMailPath !== "trash" && (
            <div onClick={handleTrashEmail} className="p-2 cursor-pointer rounded-full  hover:bg-teal-200/30 transition-all duration-500 ease-in-out">
              <FaTrash size={"16px"} id="fatrash" />
              <Tooltip anchorSelect="#fatrash" content="Trash" place="top" className="backdrop-blur-3xl" border="1px solid red" float={true} opacity={0.5} />
            </div>
          )}
          {selectedEmailsArray.length > 0 && (selectedMailPath === "trash" || selectedMailPath === "allmails") && (
            <div onClick={handleRestoreEmail} className="p-1 cursor-pointer bg-gray-200 shadow-lg rounded-md hover:text-teal-700 hover:font-semibold hover:bg-teal-200/30 transition-all duration-500 ease-in-out text-black">
              <div>Restore</div>
            </div>
          )}
          {selectedEmailsArray.length > 0 && selectedMailPath === "trash" && (
            <div onClick={handleDeleteEmail} className="p-1 cursor-pointer bg-gray-200 shadow-lg rounded-md hover:text-rose-700 hover:font-semibold hover:bg-rose-200/30 transition-all duration-500 ease-in-out text-black">
              <div>Delete for Me</div>
            </div>
          )}
          {selectedEmailsArray.length > 0 && selectedMailPath === "trash" && (
            <div onClick={handleDeletePermanentEmail} className="p-1 cursor-pointer bg-gray-200 shadow-lg rounded-md hover:text-rose-700 hover:font-semibold hover:bg-rose-200/30 transition-all duration-500 ease-in-out text-black">
              <div>Delete for All</div>
            </div>
          )}
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
