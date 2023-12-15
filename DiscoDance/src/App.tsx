// import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import AccediRegistrati from "./pages/AccediRegistrati";
import ProfilePage from "./pages/ProfilePage";
import Header from "./pages/Header";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
    },
    {
        path: "/AccediRegistrati",
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
        path: "/profile",
        element: <ProfilePage />,
    },
    {
        path: "*",
        element: <Navigate to="/home" />,
    },
]);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
