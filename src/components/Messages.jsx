import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";

const Messages = () => {
  const { emails, searchText } = useSelector((state) => state.appSlice);
  const [tempEmails, setTempEmails] = useState(emails);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set a debounce timeout for filtering emails
    const debounce = setTimeout(() => {
      const filteredEmails = emails?.filter((email) => {
        return (
          email?.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
          email?.to?.toLowerCase().includes(searchText.toLowerCase()) ||
          email?.message?.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setTempEmails(filteredEmails);
    }, 1000); // 300ms debounce delay

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(debounce);
    };
  }, [searchText, emails]); // Effect runs when searchText or emails change

  return (
    <div>
      {tempEmails &&
        tempEmails?.map((email) => <Message key={email.id} email={email} />)}
    </div>
  );
};

export default Messages;
