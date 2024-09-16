import { useAppDispatch, useProductSelector } from "@datn/redux/hook";
import { getProducts } from "@datn/redux/slices/product/fetchFunction";
import { Box, Container, Grid2 } from "@mui/material";
import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const { data } = useProductSelector().product;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
          {data?.map((item) => {
            return (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.productId}>
                <Link
                  to={`/products/${item.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductItem
                    name={item.name}
                    img={item.image[0]}
                    price={item.price}
                    highlight={item.highlight}
                    numberColor={item.variants.length}
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
