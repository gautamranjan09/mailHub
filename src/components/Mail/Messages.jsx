import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner";
import nProgress from "nprogress";

const Messages = ({ emails }) => {
  const searchText = useSelector((state) => state.appSlice.searchText);
  const user = useSelector((state) =>  state.appSlice.user);
  const selectedMailPath = useSelector((state) => state.navSlice.selectedMailPath);
  const [tempEmails, setTempEmails] = useState(null);
  const filterMails = useRef([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    nProgress.start();
    if(selectedMailPath === "inbox")
      filterMails.current = emails?.filter(email => email.to === user.email);
    else if(selectedMailPath === "sent")
      filterMails.current = emails?.filter(email => email.from === user.email);

  },[selectedMailPath, emails, user.email]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchText && typeof searchText === "object") {
        // When searchText is a suggestion object (from clicking a suggestion)
        const filteredEmails = filterMails.current?.filter((email) => {
          return email.id === searchText.id;
        });
        setTempEmails(filteredEmails);
      } else if (searchText) {
        // When searchText is a string (from typing in the search box)
        const filteredEmails = filterMails.current?.filter((email) => {
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
        setTempEmails(filterMails.current);
      }
    }, 1000); // Reduced debounce time from 1000ms to 300ms for better responsiveness
    
    return () => {
      clearTimeout(debounce);
      nProgress.done();
    };
  }, [searchText, filterMails.current]);

  return (
    <div>
      {!tempEmails && <div className="fixed top-20 left-1/2"><LoadingSpinner /></div>}
      {tempEmails &&
        tempEmails?.map((email, index) => <Message key={email.id} email={email} index={index}/>)}
    </div>
  );
};

export default Messages;
