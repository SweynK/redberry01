/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilterForm from "./components/FilterForm";
import Ful from "./Ful";
import Header from "./components/Header";
import AppLayout from "./ui/AppLayout";
import Home from "./starter/Home";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ful",
        element: <Ful />,
      },
      {
        path: "*", // This matches any path that is not defined above
        element: <Error />, // Render the Error component for unknown routes
      },
    ],
  },
]);

export default function App() {
  // return (
  //   <div className="w-full min-h-screen bg-white">
  //     <Header />

  //     <div className="max-w-[1596px] mx-auto pt-[77px]">
  //       <div>
  //         <FilterForm />
  //         <div>
  //           <button className="">ლისტინგის დამატება</button>
  //           <button>აგენტის დამატება</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return <RouterProvider router={router} />;
}
