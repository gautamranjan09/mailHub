import React, { useState } from "react";
import TextEditor from "./TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/appSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const ComposeMail = () => {
  const user = useSelector((state)=> state.appSlice.user)
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const dispatch = useDispatch();

  async function handleFormSubmit(e){
    e.preventDefault();
    dispatch(setOpen(false));

    await addDoc(collection(db, "emails"),{
      to: to,
      from:user?.email,
      subject: subject,
      message:editorContent,
      emailID:user?.email,
      read:false,
      // plainMessage: stripHtml(editorContent),
      createdAt: serverTimestamp(),
    })

    await addDoc(collection(db, "emails"),{
      to: to,
      from:user?.email,
      subject: subject,
      message:editorContent,
      emailID:to,
      read:false,
      // plainMessage: stripHtml(editorContent),
      createdAt: serverTimestamp(),
    })

    setTo("");
    setSubject("");
    setEditorContent("");
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 p-3">
      <div className="bg-white rounded-lg shadow-md p-2  mx-auto">
        <div className="mb-2">
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To"
            required
            className="w-full h-7 p-1 mb-1 border-b-[1px] text-sm border-b-gray-300 focus:outline-none"
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
            className="w-full h-7 pb-1 pr-1 pl-1 text-sm pt-0 border-b-[1px] border-b-gray-300 focus:outline-none"
          />
        </div>
        <div className="text-editor-container">
          {/* Use the TextEditor component */}
          <TextEditor value={editorContent} onChange={setEditorContent} />
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#0B57D0] rounded-full w-fit px-6 py-[0.32rem] text-white font-medium  hover:shadow-2xl hover:bg-[#246fe8] hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
      >
        Send
      </button>
    </form>
  );
};

export default ComposeMail;
