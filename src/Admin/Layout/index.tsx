import { Box } from "@mui/material";
import useAdminSidebar from "./components/hooks/useAdminLayout";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./Header";
import Content from "@datn/Layout/content/Content";

export default function AdminLayout() {
  const { sidebar: forAdminSidebar } = useAdminSidebar();
  return (
    <Box sx={{ position: "relative" }}>
      <AdminSidebar configs={forAdminSidebar} basePath="admin" />
      <Box sx={{ position: "relative", zIndex: 1, ml: "230px", px: 3 }}>
        <AdminHeader />
        <Content headerHeight="60px" />
      </Box>
    </Box>
  );
}
