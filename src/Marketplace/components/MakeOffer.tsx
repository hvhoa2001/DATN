import { CloseIcon } from "@datn/common/icons";
import useDialogState from "@datn/hooks/useDialogState";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Props = {
  image: string;
  name: string;
  balance: number;
  floorPrice: number;
  bestOffer: number;
  currentOffer?: number;
  endTime?: number;
};

export default function MakeOffer({
  image,
  name,
  balance,
  floorPrice,
  bestOffer,
  currentOffer,
}: //   endTime,
Props) {
  const { open, handleClose } = useDialogState();
  const [offerValue, setOfferValue] = useState<number>();
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="smm">
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
          <Typography variant="h4">Make an Offer</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <img
              src={image}
              alt="nft-img"
              style={{ width: "60px", height: "auto" }}
            />
            <Box>
              <Typography variant="body1">{name}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="h1">{currentOffer}</Typography>
          </Box>
        </Box>
        <Paper sx={{ p: 2, mb: 1, background: "background.paper2" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" fontWeight={600}>
              Balance
            </Typography>
            <Typography variant="body1">{balance}</Typography>
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
      </Paper>
      <Box>
        <LoadingButton disabled={!offerValue}>Make offer</LoadingButton>
      </Box>
    </Dialog>
  );
}
