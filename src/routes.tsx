import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "./Layout/Layout";

export default function RouterUrl() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [{}],
    },
  ]);
}
