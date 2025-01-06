import { CloseIcon } from "@datn/common/icons";
import { useBalanceUSDT } from "@datn/hooks/useBalance/useBalance";
import useDialogState from "@datn/hooks/useDialogState";
import { formatNumber } from "@datn/utils/format";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { useAccount } from "wagmi";

type Props = {
  image: string;
  name: string;
  floorPrice: number;
  bestOffer: number;
  currentOffer?: number;
  endTime?: number;
};

export default function MakeOffer({
  image,
  name,
  floorPrice,
  bestOffer,
  currentOffer,
}: Props) {
  const { handleClose } = useDialogState();
  const [offerValue, setOfferValue] = useState<number>();
  const { address: userAddress } = useAccount();

  const balance = useBalanceUSDT({ address: userAddress as `0x${string}` });

  return (
    <Paper sx={{ p: 3, width: "600px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Typography variant="h4">Make an Offer</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        <img
          src={image}
          alt="nft-img"
          style={{ width: "100px", height: "auto" }}
        />
        <Box>
          <Typography variant="body1">{name}</Typography>
        </Box>
      </Box>
      <Paper sx={{ p: 2, mb: 1, background: "background.paper2" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontWeight={600}>
            Balance
          </Typography>
          <Typography variant="body1">
            {formatNumber(
              new BigNumber(Number(balance.data?.value)).div(1e6).toNumber(),
              { suffix: "USDT" }
            )}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontWeight={600}>
            Floor price
          </Typography>
          <Typography variant="body1">{floorPrice}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontWeight={600}>
            Best offer
          </Typography>
          <Typography variant="body1">{bestOffer}</Typography>
        </Box>
      </Paper>
      <TextField
        value={offerValue}
        onChange={(e) => setOfferValue(Number(e.target.value))}
        label="Price"
        fullWidth
        type="number"
        sx={{ my: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <LoadingButton disabled={!offerValue} variant="contained">
          Make offer
        </LoadingButton>
      </Box>
    </Paper>
  );
}
