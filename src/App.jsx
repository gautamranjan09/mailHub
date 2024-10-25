import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Body from "./Pages/Body";
import Inbox from "./Pages/Inbox";
import Mail from "./Pages/Mail"
import SendMail from "./components/ComposeMail/SendMail";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "./redux/appSlice";
import NProgress from 'nprogress'; 
import 'nprogress/nprogress.css'; 
import LoadingSpinner from "./components/UI/LoadingSpinner";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/inbox",
    element: <Body />,
    children: [
      {
        path: "/inbox", // This will show Inbox when /inbox is visited
        element: <Inbox />,
        index: true,
      },
      {
        path: "/inbox/:id", // Show a specific email based on id
        element: <Mail/>,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state
  const emails = useSelector((state) => state.appSlice.emails);
  console.log("app");
  

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt
          ? doc
              .data()
              .createdAt.toDate()
              .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : null,
      }));

      dispatch(setEmails(allEmails));
      setLoading(false); // Stop loading when emails are fetched
      NProgress.done(); // Stop NProgress after fetching emails
    });

    return () => {
      unsubscribe();
      NProgress.done(); // Ensure NProgress stops on unmount
    }; // Cleanup on unmount
  }, []);

   // Start NProgress when the app is loading
   useEffect(() => {
    if (loading) {
      NProgress.start();
    }
  }, [loading]);

  return (
    <div className="bg-teal-50 h-screen w-screen overflow-hidden">
      <Navbar />
      {loading ? (
          <LoadingSpinner/>
      ) : (
        <RouterProvider router={router} />
      )}
      <div className="fixed w-[36%] bottom-0 right-10 z-10">
        <SendMail />
      </div>
    </div>
  );
}

export default App;
