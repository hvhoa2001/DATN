import useProductId from "@datn/hooks/useProductId";
import { useAppDispatch } from "@datn/redux/hook";
import {
  getProductDetail,
  getVariantDetail,
} from "@datn/redux/slices/product/fetchFunction";
import { Box, Container, Grid2 } from "@mui/material";
import { useEffect } from "react";
import Info from "./Info";
import ImageDetail from "./image";
import ProductContextProvider, { useProductContext } from "../context";

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
  const { selectedVariantIndex, productData } = useProductContext();

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (productData?.variants && selectedVariantIndex >= 0) {
      const selectedVariant = productData.variants[selectedVariantIndex];
      if (selectedVariant) {
        dispatch(
          getVariantDetail({
            productId: productId || "",
            variantId: selectedVariant._id || "",
          })
        );
      }
    }
  }, [productData, selectedVariantIndex, dispatch, productId]);

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
