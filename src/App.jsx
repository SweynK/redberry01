/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ful from "./Ful";
import AppLayout from "./ui/AppLayout";
import Home from "./starter/Home";
import Error from "./ui/Error";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

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
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
