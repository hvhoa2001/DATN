import { Box } from "@mui/material";
import Header from "./Header";
import Content from "./Content";

export default function MarketplaceLayout() {
  const headerHeight = "60px";
  return (
    <Box sx={{ position: "relative" }}>
      <Header headerHeight={headerHeight} />
      <Content headerHeight={headerHeight} />
    </Box>
  );
}
