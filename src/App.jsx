/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddListing from "./AddListing";
import AppLayout from "./ui/AppLayout";
import Home from "./starter/Home";
import Error from "./ui/Error";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import ListingDetail from "./components/ListingDetail";
import AddAgent from "./components/AddAgent";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listing/:id",
        element: <ListingDetail />, // Component to render when navigating to /listing/:id
      },
      {
        path: "/add-listing",
        element: <AddListing />,
      },
      {
        path: "*", // This matches any path that is not defined above
        element: <Error />, // Render the Error component for unknown routes
      },
    ],
  },
]);

export default function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
