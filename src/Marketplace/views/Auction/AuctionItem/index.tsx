import { formatNumber } from "@datn/utils/format";
import { Box, Typography } from "@mui/material";

type Props = {
  name: string;
  image: string;
  price: number;
};

export default function AuctionItem({ name, image, price }: Props) {
  return (
    <Box>
      <img src={image} alt="" />
      <Box>
        <Typography variant="body2" color="text.primary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {formatNumber(price, { fractionDigits: 2 })}
        </Typography>
      </Box>
    </Box>
  );
}
