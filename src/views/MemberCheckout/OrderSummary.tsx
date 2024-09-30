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
        Order Summary
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

      <Typography variant="body1" mt={4}>
        Arrives Fri, Oct 4 - Thu, Oct 10
      </Typography>
      {data?.map((item, index) => {
        return (
          <Box key={index} mt={2}>
            <OrderItem
              name={item.name}
              gender={"Men"}
              quantity={item.quantity}
              size={item.size}
              price={item.price}
              image={item.image}
            />
          </Box>
        );
      })}
    </Box>
  );
}

type Props = {
  name: string;
  gender: string;
  quantity: number;
  size: number;
  price: number;
  image: string;
};

function OrderItem({ name, gender, quantity, price, size, image }: Props) {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <img
        src={image}
        style={{
          height: "164px",
          width: "164px",
          marginRight: "12px",
        }}
      />
      <Box>
        <Typography variant="body2" color="text.primary" mb={0.5}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.primary" mb={0.5}>
          {gender}'s Shoes
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Qty {quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Size EU {size}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}$
        </Typography>
      </Box>
    </Box>
  );
}
