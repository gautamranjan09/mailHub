import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Body from "./Pages/Body";
import Inbox from "./Pages/Inbox";
import Mail from "./Pages/Mail";
import SendMail from "./components/ComposeMail/SendMail";
import { collection, onSnapshot, or, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmails, setUser } from "./redux/appSlice";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Sent from "./Pages/Sent";
import Starred from "./Pages/Starred";
import Snoozed from "./Pages/Snoozed";
import Draft from "./Pages/Draft";
import Trash from "./Pages/Trash";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./Pages/UserProfile";


// Define the routes
const createRouter = (signedIn) =>
  createBrowserRouter([
    {
      path: "/",
      element: !signedIn ? <Login /> : <Navigate to="/inbox" />,
    },
    {
      path: "/signup",
      element: !signedIn ? <SignUp /> : <Navigate to="/inbox" />,
    },
    {
      path: "/forgotpassword",
      element: !signedIn ? <ForgotPassword /> : <Navigate to="/inbox" />,
    },
    {
      path: "/userprofile",
      element: signedIn ? <UserProfile /> : <Navigate to="/" />,
    },
    {
      path: "/inbox",
      element: <Body />,
      children: [
        { path: "/inbox", element: signedIn ? <Inbox /> : <Navigate to="/" /> },
        {
          path: "/inbox/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/starred",
      element: <Body />,
      children: [
        {
          path: "/starred",
          element: signedIn ? <Starred /> : <Navigate to="/" />,
        },
        {
          path: "/starred/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/snoozed",
      element: <Body />,
      children: [
        {
          path: "/snoozed",
          element: signedIn ? <Snoozed /> : <Navigate to="/" />,
        },
        {
          path: "/snoozed/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/sent",
      element: <Body />,
      children: [
        { path: "/sent", element: signedIn ? <Sent /> : <Navigate to="/" /> },
        {
          path: "/sent/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/draft",
      element: <Body />,
      children: [
        { path: "/draft", element: signedIn ? <Draft /> : <Navigate to="/" /> },
        {
          path: "/draft/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/trash",
      element: <Body />,
      children: [
        { path: "/trash", element: signedIn ? <Trash /> : <Navigate to="/" /> },
        {
          path: "/trash/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state
  const emails = useSelector((state) => state.appSlice.emails);
  const user = useSelector((state) => state.appSlice.user);

  useEffect(() => {
    const q = query(
      collection(db, "emails"), 
      or(
        where("to", "==", user?.email || ""),
        where("from", "==", user?.email || "")
      ),
      orderBy("createdAt", "desc")
    );
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
  }, [user]);

  // Start NProgress when the app is loading
  useEffect(() => {
    if (loading) {
      NProgress.start();
    }
  }, [loading]);

  const router = createRouter(user);

  return (
    <>
      <ToastContainer />
      {loading ? <LoadingSpinner /> : <RouterProvider router={router} />}
      <div className="fixed w-[36%] bottom-0 right-10 z-10">
        <SendMail />
      </div>
    </>
  );
}

export default App;
