import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from './pages/Layout'
import { Login } from './pages/Login'
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
                // errorElement: <NotFound />,
            },
            {
                path: "/login",
                element: <Login />,
                // errorElement: <NotFound />,
            },
            {
                path: "/register",
                element: <Register />,
                // errorElement: <NotFound />,
            },
        ]
    },

]);
