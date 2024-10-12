import React from "react";
import { useRoutes } from "react-router-dom";
import FavoritesPage from "./views/Favorites";
import RequireRole from "./common/RequireRoleProps";
import AdminPage from "./views/Admin";

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
        {
          path: "cart",
          element: (
            <RequireRole allowedRoles={["user"]}>
              <Cart />
            </RequireRole>
          ),
        },
        { path: "products", element: <ProductsPage /> },
        { path: "products/c/:category", element: <ProductsPage /> },
        { path: "products/d/:productId", element: <ProductDetail /> },
        {
          path: "/favorite",
          element: (
            <RequireRole allowedRoles={["user"]}>
              <FavoritesPage />
            </RequireRole>
          ),
        },
        {
          path: "/member-checkout",
          element: (
            <RequireRole allowedRoles={["user"]}>
              <MemberCheckout />
            </RequireRole>
          ),
        },
      ],
    },
    { path: "login", element: <Login /> },
    {
      path: "admin",
      element: (
        <RequireRole allowedRoles={["admin"]}>
          <AdminPage />
        </RequireRole>
      ),
    },
  ]);
}
