import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import createBrowserRouter and RouterProvider
// import React from 'react';
import Landing from "./components/Landing";
import Upload from "./components/Upload";
import SidebarWithHeader from "./Sidebar";
import Timelist from "./components/Timelist";
import AboutUs from "./components/AboutUs";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />, // Route for the Landing page
  },
  {
    path: "/upload",
    element: <Upload />, // Route for the Landing page
  },
  {
    path: "/sidebar",
    element: <SidebarWithHeader />, // Route for the Landing page
  },
  {
    path: "/timelist",
    element: <Timelist />, // Route for the Landing page
  },
  {
    path: "/about",
    element: <AboutUs />, // Route for the Landing page
  },
  

]);

const App = () => {
  return (
    <ChakraProvider>
      {/* <AuthProvider> */}
        <RouterProvider router={router} />{" "}
        {/* Use RouterProvider with the created router */}
      {/* </AuthProvider> */}
    </ChakraProvider>
  );
}

export default App