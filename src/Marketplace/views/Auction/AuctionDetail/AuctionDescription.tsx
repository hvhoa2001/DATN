import { formatAddress } from "@datn/utils/format";
import { Box, Paper, Typography } from "@mui/material";
type Props = {
  description: string;
  addressContract: string;
};

export default function AuctionDescription({
  addressContract,
  description,
}: Props) {
  return (
    <Paper sx={{ mt: 2, border: "1px solid #ffffff1f" }}>
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid #ffffff1f",
        }}
      >
        <Typography variant="body1">Description</Typography>
      </Box>
      <Box p={3}>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Contract Address: {formatAddress(addressContract)}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  );
}
