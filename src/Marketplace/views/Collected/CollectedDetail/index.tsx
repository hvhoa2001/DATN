import { useTokenId } from "@datn/hooks/useProductId";
import { useProductContext } from "@datn/views/Product/context";
import useNFTsAuctionContract from "@datn/web3/hooks/useNFTsAuctionContract";
import useNFTsContract from "@datn/web3/hooks/useNFTsContract";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import BigNumber from "bignumber.js";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

type HelperText = {
  minPrice?: string;
  maxPrice?: string;
  startTime?: string;
  endTime?: string;
};

export default function CollectedDetail() {
  const { NFTsDataDetail } = useProductContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(2);
  const tokenId = useTokenId();
  const [startTime, setStartTime] = useState<number>(Date.now() / 1000);
  const [endTime, setEndTime] = useState<number>(Date.now() / 1000 + 86400);
  const { approve } = useNFTsContract({
    contractAddress: "0xA5416449768E6f1D2dA8dcE97f66c5FcAEF49B67",
  });

  const { createAuction } = useNFTsAuctionContract({
    contractAddress: "0xad650614Ee4967324e3A95E4223d40ce52BD2B6C",
  });

  const handleListing = async () => {
    if (NFTsDataDetail && tokenId) {
      setLoading(true);
      try {
        setLoading(false);
        await approve(
          "0xad650614Ee4967324e3A95E4223d40ce52BD2B6C",
          Number(tokenId)
        );

        await createAuction(
          "0xA5416449768E6f1D2dA8dcE97f66c5FcAEF49B67",
          Number(tokenId),
          "0x2A3fbEEc03B99A60f357165EaAbF836bDADADD3f",
          new BigNumber(minPrice).times(new BigNumber(Math.pow(10, 6))),
          new BigNumber(maxPrice).times(new BigNumber(Math.pow(10, 6))),
          Math.round(startTime),
          Math.round(endTime)
        );
        toast.success("Listing success!");
      } catch (error) {
        setLoading(false);
        toast.error((error as Error).message);
        throw error;
      }
    }
  };

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
        <Box sx={{ display: "flex", gap: 8 }}>
          <img
            src={NFTsDataDetail?.image}
            alt={`${NFTsDataDetail?.name}`}
            style={{ width: "350px", height: "auto" }}
          />
          <Box>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h3" color="text.primary" mb={2}>
                {NFTsDataDetail?.name}
              </Typography>
              <Typography variant="body1" color="text.primary">
                {NFTsDataDetail?.description}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <TextField
                  type="number"
                  value={minPrice.toString()}
                  label="Min Price"
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  fullWidth
                  error={minPrice > maxPrice}
                  helperText={`${
                    minPrice > maxPrice
                      ? "Min price must be less than max price"
                      : ""
                  }`}
                />
                <TextField
                  type="number"
                  value={maxPrice.toString()}
                  label="Max Price"
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  fullWidth
                  error={maxPrice < minPrice}
                  helperText={`${
                    maxPrice < minPrice
                      ? "Max price must be greater than min price"
                      : ""
                  }`}
                />
              </Box>
            </Paper>
            <Box mt={3}>
              <Typography variant="h3" color="text.primary">
                Auction Time
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <DateTimePicker
                  value={dayjs(startTime * 1000)}
                  onChange={(date: Dayjs | null) => {
                    setStartTime(
                      date?.toDate().getTime()
                        ? Number(date.toDate().getTime() / 1000)
                        : Date.now() / 1000
                    );
                  }}
                  label="Starts"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: startTime > endTime,
                      helperText: `${
                        startTime > endTime
                          ? "Start time must be less than end time"
                          : ""
                      } `,
                    },
                  }}
                />
                <DateTimePicker
                  value={dayjs(endTime * 1000)}
                  onChange={(date: Dayjs | null) => {
                    setEndTime(
                      date?.toDate().getTime()
                        ? Number(date.toDate().getTime() / 1000)
                        : Date.now() / 1000
                    );
                  }}
                  label="Ends"
                  slotProps={{
                    textField: {
                      error: endTime < startTime,
                      helperText: `${
                        endTime < startTime
                          ? "End time must be greater than start time"
                          : ""
                      } `,
                      fullWidth: true,
                    },
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <LoadingButton
                loading={loading}
                onClick={handleListing}
                variant="contained"
                sx={{ width: "236px", height: "56px" }}
              >
                Listing for sale
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
