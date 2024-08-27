import Providers from "@datn/context/Providers";
import { Box } from "@mui/material";
import Header from "./Header/Header";
import Content from "./content/Content";
import ModalCustom from "./ModalCustom/ModalCustom";
import Footer from "./Footer/Footer";

export default function Layout() {
  const headerHeight = "66px";
  return (
    <Providers>
      <Box sx={{ position: "relative" }}>
        {/* <Sidebar sidebarWidth={sidebarWidth} headerHeight={headerHeight} /> */}
        {/* <Box
          sx={{
            position: "relative",
            zIndex: 1,
            ml: { xs: 0, lg: sidebarWidth },
          }}
        > */}
        <Header headerHeight={headerHeight} />
        <Content headerHeight={headerHeight} />
        <Footer />
        {/* </Box> */}
      </Box>
      <ModalCustom />
    </Providers>
  );
}
