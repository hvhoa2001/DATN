import useProductId from "@datn/hooks/useProductId";
import { useAppDispatch } from "@datn/redux/hook";
import { getProductDetail } from "@datn/redux/slices/product/fetchFunction";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import Info from "./Info";

export default function ProductDetail() {
  const productId = useProductId();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(productId));
    }
  }, [productId]);

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
        <Info />
      </Container>
    </Box>
  );
}
