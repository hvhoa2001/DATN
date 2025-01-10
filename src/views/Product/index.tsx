import {
  getProductsNFT,
  getNFTDetail,
} from "@datn/redux/slices/product/fetchFunction";
import { Box, Container, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import ProductContextProvider from "./context";
import { useCategory } from "@datn/hooks/useCategory";
import { useAppDispatch, useProductSelector } from "@datn/redux/hook";

export default function ProductsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsNFT());
  }, [dispatch]);

  const { data } = useProductSelector().productNFT;

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
          {data &&
            data.map((item) => {
              return (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.productId}>
                  <Link
                    to={`/products/d/${item.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProductItem
                      id={item.productId}
                      name={item.name}
                      img={item.image}
                      currentPrice={item.price}
                      subImg={Array(item.image)}
                      numberColor={1}
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
