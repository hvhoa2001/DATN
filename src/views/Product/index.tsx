import { useAppDispatch } from "@datn/redux/hook";
import { getProducts } from "@datn/redux/slices/product/fetchFunction";
import { Box, Container, Grid2 } from "@mui/material";
import { useEffect, useMemo } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import ProductContextProvider, { useProductContext } from "./context";

export default function ProductsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <ProductContextProvider>
      <ProductComponent />
    </ProductContextProvider>
  );
}

function ProductComponent() {
  const { commonData } = useProductContext();
  const detailData = useMemo(() => {
    return commonData?.map((item) => ({
      productId: item.productId,
      preview: item.variants[0]?.preview,
      currentPrice: item.variants[0]?.currentPrice || 0,
      highlight: item.variants[0]?.highlight,
      price: item.variants[0]?.fullPrice || 0,
      sale: item.variants[0].saleRate || 0,
      gender: item.gender,
    }));
  }, [commonData]);
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
        <Grid2 container sx={{ width: "100%" }} spacing={2}>
          {commonData?.map((item) => {
            const subImages = item.variants.flatMap(
              (variant) => variant.preview
            );
            const detail = detailData?.find(
              (i) => i.productId === item.productId
            );
            return (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.productId}>
                <Link
                  to={`/products/${item.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductItem
                    id={item.productId}
                    name={item.name}
                    img={detail?.preview}
                    currentPrice={detail?.currentPrice || 0}
                    highlight={detail?.highlight}
                    numberColor={item.variants.length}
                    subImg={subImages}
                    price={detail?.price}
                    saleRate={detail?.sale}
                    gender={detail?.gender}
                  />
                </Link>
              </Grid2>
            );
          })}
        </Grid2>
      </Container>
    </Box>
  );
}
