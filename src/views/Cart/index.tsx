import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { getCartItems } from "@datn/redux/slices/common/fetchFunction";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import CartItem from "./CartItem";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";

export default function Cart() {
  const [fee, setFee] = useState<number>(10);
  const { data, status } = useCommonDataSelector().cart;
  const dispatch = useAppDispatch();

  const subTotal = useMemo(() => {
    return data?.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }, [data]);

  const total = useMemo(() => {
    if (!subTotal) return 0;
    if (subTotal < 200) {
      setFee(10);
    } else {
      setFee(0);
    }
    return subTotal + fee;
  }, [subTotal, fee]);

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
        {status === "SUCCESS" && data && data.length > 0 && (
          <Grid2
            container
            spacing={4}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant="h3" mb={4}>
                Bag
              </Typography>
              {data?.map((item) => {
                return (
                  <Box key={item.productId}>
                    <CartItem
                      productId={item.productId}
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
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography variant="h3" mb={4}>
                Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" mr={1}>
                    Subtotal
                  </Typography>
                  <Tooltip
                    title="The subtotal reflects the total price of your order, including taxes, before any applicable discounts. It does not include delivery costs and international transaction fees."
                    placement="bottom"
                  >
                    <HelpOutlineIcon fontSize="small" />
                  </Tooltip>
                </Box>
                <Typography variant="body1" fontWeight={600}>
                  {subTotal}$
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 4,
                }}
              >
                <Typography variant="body1">
                  Estimated Delivery & Handling
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {`${fee == 0 ? "Free" : `${fee}$`}`}
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 3,
                }}
              >
                <Typography variant="body1">Total</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {total}$
                </Typography>
              </Box>
              <Divider />
              <Link to={"/member-checkout"}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "30px", mt: 6, height: "56px" }}
                  fullWidth
                >
                  Member Checkout
                </Button>
              </Link>
            </Grid2>
          </Grid2>
        )}
        {status === "SUCCESS" && data && data.length == 0 && <Nodata />}
      </Container>
    </Box>
  );
}

function Nodata() {
  return (
    <Grid2 container spacing={3} sx={{ width: "100%" }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Typography variant="h3" mb={4}>
          Bag
        </Typography>
        <Typography variant="body1">There are no items in your bag.</Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Typography variant="h3" mb={4}>
          Summary
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" mr={1}>
              Subtotal
            </Typography>
            <Tooltip
              title="The subtotal reflects the total price of your order, including taxes, before any applicable discounts. It does not include delivery costs and international transaction fees."
              placement="bottom"
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Box>
          <Typography variant="body1" fontWeight={600}>
            --
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Typography variant="body1">Estimated Delivery & Handling</Typography>
          <Typography variant="body1" fontWeight={600}>
            Free
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 3,
          }}
        >
          <Typography variant="body1">Total</Typography>
          <Typography variant="body1" fontWeight={600}>
            --
          </Typography>
        </Box>
        <Divider />
        <Button
          variant="contained"
          sx={{ borderRadius: "30px", mt: 6, height: "56px" }}
          fullWidth
          disabled
        >
          Member Checkout
        </Button>
      </Grid2>
    </Grid2>
  );
}
