// import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import DetailPage from "./pages/DetailPage";
import HomePage  from "./pages/HomePage";


const router = createBrowserRouter([
    {
        path: "/",
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