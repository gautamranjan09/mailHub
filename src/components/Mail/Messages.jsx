import React, { useEffect, useMemo, useRef, useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner";
import nProgress from "nprogress";
import { useNavigate } from "react-router-dom";
import { setMailCount, setTotalNumOfMails } from "../../redux/navSlice";

const Messages = ({ noOfMailOnCurrPage }) => {
  const emails = useSelector((state) => state.appSlice.emails);
  const searchText = useSelector((state) => state.appSlice.searchText);
  const user = useSelector((state) => state.appSlice.user);
  const selectedMailPath = useSelector((state) => state.navSlice.selectedMailPath);
  const [tempEmails, setTempEmails] = useState([]);
  const filterMails = useRef([]);
  const [newFilteredMails, setNewFilteredMails] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    nProgress.start();
    if (selectedMailPath === "inbox") filterMails.current = emails?.filter((email) => email.to === user.email);
    else if (selectedMailPath === "sent") filterMails.current = emails?.filter((email) => email.from === user.email);
    else if (selectedMailPath === "allmails") filterMails.current = emails;

    setNewFilteredMails(filterMails.current);
  }, [selectedMailPath, emails, user.email]);

  useMemo(() => {
    if (selectedMailPath === "inbox") dispatch(setMailCount(tempEmails.length));

    dispatch(setTotalNumOfMails(tempEmails.length)); // this is to tell how many emails are in every path(sidebar link)
  }, [tempEmails]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchText && typeof searchText === "object") {
        // When searchText is a suggestion object (from clicking a suggestion)
        const filteredEmails = newFilteredMails?.filter((email) => {
          return email.id === searchText.id;
        });
        setTempEmails(filteredEmails);
      } else if (searchText) {
        // When searchText is a string (from typing in the search box)
        const filteredEmails = newFilteredMails?.filter((email) => {
          const searchLower = searchText.toLowerCase();
          return (
            email?.subject?.toLowerCase().includes(searchLower) ||
            email?.to?.toLowerCase().includes(searchLower) ||
            email?.from?.toLowerCase().includes(searchLower) ||
            email?.message?.toLowerCase().includes(searchLower) ||
            email?.id?.toLowerCase().includes(searchLower)
          );
        });
        //navigate("/allmails");
        console.log("hffghh");

        setTempEmails(filteredEmails);
      } else {
        // When searchText is empty
        setTempEmails(newFilteredMails);
      }
      nProgress.done();
    }, 300); // Reduced debounce time from 1000ms to 300ms for better responsiveness
    return () => {
      clearTimeout(debounce);
    };
  }, [searchText, newFilteredMails]);

  return (
    <div>
      {!tempEmails && (
        <div className="fixed top-20 left-1/2">
          <LoadingSpinner />
        </div>
      )}
      {tempEmails && tempEmails.length > noOfMailOnCurrPage + 20
        ? tempEmails.slice(noOfMailOnCurrPage, noOfMailOnCurrPage + 20)?.map((email, index) => <Message key={email.id} email={email} index={index} />)
        : tempEmails.slice(noOfMailOnCurrPage)?.map((email, index) => <Message key={email.id} email={email} index={index} />)}
    </div>
  );
};

export default Messages;
