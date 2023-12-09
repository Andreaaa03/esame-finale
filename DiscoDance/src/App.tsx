// import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import AccediRegistrati from "./pages/AccediRegistrati";

const router = createBrowserRouter([
    {
        path: "/AccediRegistrati",
        element: <AccediRegistrati />,
    },
    {
        path: "/",
        element: <AccediRegistrati />,
    },
    {
        path: "/home",
        element: <HomePage />,
    },
    {
        path: "/detail/:id",
        element: <DetailPage />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
