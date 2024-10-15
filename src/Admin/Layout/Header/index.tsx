import AuthState from "@datn/common/AuthState";
import { Box } from "@mui/material";

export default function AdminHeader() {
  return (
    <Box
      sx={{
        height: "60px",
        bgcolor: "background.header",
        position: "sticky",
        top: "0",
        left: 0,
        width: "100%",
        zIndex: "900",
      }}
    >
      <AuthState />
    </Box>
  );
}
