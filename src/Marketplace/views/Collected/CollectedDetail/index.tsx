import { useTokenId } from "@datn/hooks/useProductId";
import { formatTime } from "@datn/utils/format";
import { useProductContext } from "@datn/views/Product/context";
import useNFTsAuctionContract from "@datn/web3/hooks/useNFTsAuctionContract";
import useNFTsContract from "@datn/web3/hooks/useNFTsContract";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CollectedDetail() {
  const { NFTsDataDetail } = useProductContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(2);
  const tokenId = useTokenId();

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
          Math.round(Date.now() / 1000),
          Math.round(Date.now() / 1000) + 3600
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
            style={{ width: "300px", height: "auto" }}
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
                />
                <TextField
                  type="number"
                  value={maxPrice.toString()}
                  label="Max Price"
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  fullWidth
                />
              </Box>
            </Paper>
            <Box mt={3}>
              <Typography variant="h3" color="text.primary">
                Auction Time
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Starts:{" "}
                {formatTime(Date.now() / 1000, { date: true, time: true })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ends:{" "}
                {formatTime(Date.now() / 1000 + 3600, {
                  date: true,
                  time: true,
                })}
              </Typography>
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
