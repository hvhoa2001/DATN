import { Box, Container, Grid2 } from "@mui/material";
import OrderSummary from "./OrderSummary";
import DeliveryForm from "./DeliveryForm";
import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { useEffect } from "react";
import { getCheckout } from "@datn/redux/slices/common/fetchFunction";

export default function MemberCheckout() {
  const { checkoutSize, checkoutName } = useCommonDataSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checkoutName && checkoutSize) {
      dispatch(getCheckout({ size: checkoutSize, name: checkoutName }));
    }
  }, [dispatch, checkoutName, checkoutSize]);
  return (
    <Box component="section">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 10,
        }}
      >
        <Grid2
          container
          spacing={6}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Grid2 size={{ xs: 12, sm: 5 }}>
            <DeliveryForm />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <OrderSummary />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
