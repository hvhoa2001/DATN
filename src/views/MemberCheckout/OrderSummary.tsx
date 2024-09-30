import { Box, Divider, Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useMemo, useState } from "react";
import { useCommonDataSelector } from "@datn/redux/hook";

export default function OrderSummary() {
  const [fee, setFee] = useState<number>(10);
  const { data } = useCommonDataSelector().cart;

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
  return (
    <Box>
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
        <Typography variant="body1">Estimated Delivery & Handling</Typography>
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
    </Box>
  );
}
