import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";
import Inbox from "./components/Inbox";
import Mail from "./components/mail";

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
    <div className="bg-[#F6F8FC] h-screen w-screen overflow-hidden">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
