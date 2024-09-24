import useProductId from "@datn/hooks/useProductId";
import { useAppDispatch } from "@datn/redux/hook";
import { getProductDetail } from "@datn/redux/slices/product/fetchFunction";
import { Box, Container, Grid2 } from "@mui/material";
import { useEffect } from "react";
import Info from "./Info";
import ImageDetail from "./image";
import ProductContextProvider from "../context";

export default function ProductDetail() {
  return (
    <ProductContextProvider>
      <ProductDetailComponent />
    </ProductContextProvider>
  );
}

function ProductDetailComponent() {
  const productId = useProductId();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(productId));
    }
  }, [productId, dispatch]);

  return (
    <Box component={"section"}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 10,
        }}
      >
        <Grid2 container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid2 size={{ xs: 12, sm: 5 }}>
            <Box sx={{ position: "sticky", top: "60px" }}>
              <ImageDetail />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Info />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
