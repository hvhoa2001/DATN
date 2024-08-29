import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "./Layout/Layout";
import FirstPage from "./views/home/FirstPage";
import Cart from "./views/Cart";
import Login from "./views/Login";

export default function RouterUrl() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <FirstPage /> },
        { path: "cart", element: <Cart /> },
        {path: "login", element: <Login />}
      ],
    },
  ]);
}
