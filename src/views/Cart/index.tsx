import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { getCartItems } from "@datn/redux/slices/common/fetchFunction";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import CartItem from "./CartItem";

export default function Cart() {
  const { data } = useCommonDataSelector().cart;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartItems());
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
        {data?.map((item) => {
          return (
            <Box key={item.productId} sx={{ width: "100%" }}>
              <CartItem
                color={item.color}
                image={item.image}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                size={item.size}
              />
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}
