import { Box } from "@mui/material";
import Header from "./Header/Header";
import Content from "./content/Content";
import ModalCustom from "./ModalCustom/ModalCustom";
import Footer from "./Footer/Footer";
import Providers from "@datn/context/Providers";
import { Provider } from "react-redux";
import { store } from "@datn/redux/store";
import AuthContextProvider from "@datn/context/AuthContext";

export default function Layout() {
  const headerHeight = "60px";
  return (
    // <Providers>
    //   <Provider store={store}>
    //     <AuthContextProvider>
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
    //     </AuthContextProvider>
    //   </Provider>
    //   <ModalCustom />
    // </Providers>
  );
}
