import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";
import Inbox from "./components/Inbox";
import Mail from "./components/mail";
import SendMail from "./components/SendMail";

const router = createBrowserRouter([
  {
    path: "/inbox",
    element: <Body />,
    children: [
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/inbox/:id",
        element: <Mail />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-[#eff1fc] h-screen w-screen overflow-hidden">
      <Navbar />
      <RouterProvider router={router} />
      <div className="fixed w-[36%] bottom-0 right-10 z-10">
        <SendMail/>
      </div>
    </div>
  );
}

export default App;
