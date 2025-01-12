import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import FavoritesPage from "./views/Favorites";
import RequireRole from "./common/RequireRoleProps";

const Layout = React.lazy(() => import("./Layout/Layout"));
const FirstPage = React.lazy(() => import("./views/home/FirstPage"));
const Cart = React.lazy(() => import("./views/Cart"));
const Login = React.lazy(() => import("./views/Login"));
const ProductsPage = React.lazy(() => import("./views/Product"));
const ProductDetail = React.lazy(() => import("./views/Product/Detail"));
const MemberCheckout = React.lazy(() => import("./views/MemberCheckout/"));
const AdminProducts = React.lazy(() => import("./Admin/views/Products"));
const AdminLayout = React.lazy(() => import("./Admin/Layout"));
const Dashboard = React.lazy(() => import("./Admin/views/Dashboard"));
const GoogleCallback = React.lazy(() => import("./common/LoginGoogleButton"));
const MarketplaceLayout = React.lazy(
  () => import("./Marketplace/Layout/Layout")
);
const Auction = React.lazy(() => import("./Marketplace/views/Auction"));
const AuctionDetail = React.lazy(
  () => import("./Marketplace/views/Auction/AuctionDetail")
);
const Collected = React.lazy(() => import("./Marketplace/views/Collected"));
const CollectedDetail = React.lazy(
  () => import("./Marketplace/views/Collected/CollectedDetail")
);

const ListingPage = React.lazy(() => import("./Marketplace/views/Listing"));

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
          <AdminLayout />
        </RequireRole>
      ),
      children: [
        { path: "products", element: <AdminProducts /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
    { path: "/auth/google/callback", element: <GoogleCallback /> },
    {
      path: "marketplace",
      element: (
        <RequireRole allowedRoles={["user"]}>
          <MarketplaceLayout />
        </RequireRole>
      ),
      children: [
        { path: "auction", element: <Auction /> },
        { path: "auction/:auctionId", element: <AuctionDetail /> },
        { path: "", element: <Navigate to="/marketplace/auction" /> },
        { path: "collected", element: <Collected /> },
        { path: "collected/:tokenId", element: <CollectedDetail /> },
        { path: "my-listing", element: <ListingPage /> },
      ],
    },
  ]);
}

//IPZZ-003
