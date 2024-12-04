import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import { MdDeleteOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineAddTask, MdOutlineDriveFileMove, MdOutlineMarkEmailUnread, MdOutlineReport, MdOutlineWatchLater } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const Mail = () => {
  const selectedMailPath = useSelector((state) => state.navSlice.selectedMailPath);
  const navigate = useNavigate();
  const { id } = useParams();
  const emails = useSelector((state) => state.appSlice.emails);
  const totalMailsInPath = useSelector((state) => state.navSlice.totalMailsInPath);
  const user = useSelector((state) => state.appSlice.user);

  // Find the product based on the productId
  const selectedEmail = emails.find((email) => email.id === id);

  const deteteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, "emails", id));
      // navigate(`/${selectedMailPath}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkUnread = async () => {
    navigate(`/${selectedMailPath}`);
    try {
      await updateDoc(doc(db, "emails", id), {
        read: false,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const nextMail = async () => {
    const index = totalMailsInPath.findIndex((email) => email.id === selectedEmail.id);
    if (index + 1 < totalMailsInPath.length) {
      navigate(`/${selectedMailPath}/${totalMailsInPath[index + 1].id}`);
      if (totalMailsInPath[index + 1].read === false) {
        try {
          await updateDoc(doc(db, "emails", totalMailsInPath[index + 1].id), {
            read: true,
          });
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
  };

  const prevMail = async () => {
    const index = totalMailsInPath.findIndex((email) => email.id === selectedEmail.id);
    if (index - 1 >= 0) {
      navigate(`/${selectedMailPath}/${totalMailsInPath[index - 1].id}`);
      if (totalMailsInPath[index - 1].read === false) {
        try {
          await updateDoc(doc(db, "emails", totalMailsInPath[index - 1].id), {
            read: true,
          });
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
  };

  useEffect(() => {
    if (!selectedEmail) {
      // If the selected email does not exist, navigate to inbox
      navigate(`/${selectedMailPath}`);
    }
  }, [selectedEmail, navigate]);

  if (!selectedEmail) {
    // // If the selected email does not exist, navigate to inbox
    // navigate("/inbox");
    return null; // Prevent rendering the rest of the component
  }

  const iconsButton = [
    { icon: <IoMdArrowBack size={"20px"} />, function: () => navigate(`/${selectedMailPath}`) },
    { icon: <BiArchiveIn id="archive" size={"20px"} />, id: "#archive", content: "Not Clickable" },
    { icon: <MdOutlineReport size={"20px"} id="report" />, id: "#report", content: "Not Clickable" },
    { icon: <MdDeleteOutline size={"20px"} id="delete" />, function: () => deteteMailById(id), content: "Delete for Me", id: "#delete" },
    { icon: <MdOutlineMarkEmailUnread size={"20px"} id="mark-unread" />, function: handleMarkUnread, content: "Mark Unread", id: "#mark-unread" },
    { icon: <MdOutlineWatchLater size={"20px"} id="snooze" />, content: "Snoozed", id: "#snooze" },
    { icon: <MdOutlineAddTask size={"20px"} id="add-task" />, content: "Not Clickable", id: "#add-task" },
    { icon: <MdOutlineDriveFileMove size={"20px"} id="draft" />, content: "Draft", id: "#draft" },
    { icon: <IoMdMore size={"20px"} id="more" />, content: "Not Clickable", id: "#more" },
  ];

  return (
    <div className="flex-1 bg-white/70 rounded-2xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-1 text-gray-700 py-2">
          {iconsButton.map((item, index) => (
            <div
              key={index}
              onClick={item.function}
              style={{ "--delay": `${index * 300}ms` }}
              className="p-2 rounded-full hover:bg-teal-300/30 cursor-pointer transition-all duration-1000 ease-in-out animate-slideIn opacity-0 [animation-delay:var(--delay)]"
            >
              <Tooltip anchorSelect={item.id} content={item.content} place="top" className="backdrop-blur-3xl" border="1px solid red" float={true} opacity={0.5} />
              {item.icon}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 animate-slideIn">
          <button onClick={prevMail} className="rounded-full p-1 hover:bg-teal-300/30 transition-all duration-1000 ease-in-out">
            {" "}
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button onClick={nextMail} className="rounded-full p-1 hover:bg-teal-300/30 transition-all duration-1000 ease-in-out">
            {" "}
            <MdKeyboardArrowRight size={"24px"} />
          </button>
        </div>
      </div>
      <div className="h-[78vh] overflow-y-auto p-4 animate-fadeIn">
        <div className="flex items-center justify-between bg-transparent gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{selectedEmail?.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2 mt-1">{(selectedEmail?.from === user?.email && "sent") || (selectedEmail?.to === user?.email && "inbox")}</span>
          </div>
          <div className="flex-none text-gray-500 my-5 text-sm">
            <p>{selectedEmail?.createdAt}</p>
          </div>
        </div>
        <div className="flex-col gap-3 justify-center border-b-2 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">from:</span>
            <h1 className="font-normal text-sm text-black">{selectedEmail?.from}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">to:</span>
            <h1 className="font-normal text-sm text-black">{selectedEmail?.to}</h1>
          </div>
        </div>
        <div className="my-10 custom-list  shadow-sm shadow-zinc-300 p-3 rounded-md">
          {/* <p>{selectedEmail?.message}</p> */}
          <div className="formatted-content" dangerouslySetInnerHTML={{ __html: selectedEmail.message }}></div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
