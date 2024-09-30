import React from "react";
import { useRoutes } from "react-router-dom";
import FavoritesPage from "./views/Favorites";

const Layout = React.lazy(() => import("./Layout/Layout"));
const FirstPage = React.lazy(() => import("./views/home/FirstPage"));
const Cart = React.lazy(() => import("./views/Cart"));
const Login = React.lazy(() => import("./views/Login"));
const ProductsPage = React.lazy(() => import("./views/Product"));
const ProductDetail = React.lazy(() => import("./views/Product/Detail"));
const MemberCheckout = React.lazy(() => import("./views/MemberCheckout/"));

export default function RouterUrl() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <FirstPage /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <ProductsPage /> },
        { path: "products/:productId", element: <ProductDetail /> },
        { path: "/favorite", element: <FavoritesPage /> },
        { path: "/member-checkout", element: <MemberCheckout /> },
      ],
    },
    { path: "login", element: <Login /> },
  ]);
}
