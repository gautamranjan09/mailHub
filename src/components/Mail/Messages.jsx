import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";

const Messages = () => {
  const { emails, searchText } = useSelector((state) => state.appSlice);
  const [tempEmails, setTempEmails] = useState(emails);
  const dispatch = useDispatch();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchText && typeof searchText === "object") {
        // When searchText is a suggestion object (from clicking a suggestion)
        const filteredEmails = emails?.filter((email) => {
          return email.id === searchText.id;
        });
        setTempEmails(filteredEmails);
      } else if (searchText) {
        // When searchText is a string (from typing in the search box)
        const filteredEmails = emails?.filter((email) => {
          const searchLower = searchText.toLowerCase();
          return (
            email?.subject?.toLowerCase().includes(searchLower) ||
            email?.to?.toLowerCase().includes(searchLower) ||
            email?.message?.toLowerCase().includes(searchLower) ||
            email?.id?.toLowerCase().includes(searchLower)
          );
        });
        setTempEmails(filteredEmails);
      } else {
        // When searchText is empty
        setTempEmails(emails);
      }
    }, 300); // Reduced debounce time from 1000ms to 300ms for better responsiveness

    return () => {
      clearTimeout(debounce);
    };
  }, [searchText, emails]);

  return (
    <div>
      {tempEmails &&
        tempEmails?.map((email, index) => <Message key={email.id} email={email} index={index}/>)}
    </div>
  );
};

export default Messages;
