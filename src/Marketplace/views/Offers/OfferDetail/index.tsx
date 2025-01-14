import { useAuctionId } from "@datn/hooks/useProductId";
import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { formatAddress, formatNumber, formatTime } from "@datn/utils/format";
import useNFTsAuctionContract from "@datn/web3/hooks/useNFTsAuctionContract";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  Grid2,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getMyOfferDetail } from "@datn/redux/slices/common/fetchFunction";
import { claimedNFT } from "@datn/api/services";

export default function MyOfferDetail() {
  const { data } = useCommonDataSelector().myOfferDetail;
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const auctionId = useAuctionId();

  const { claimNFT } = useNFTsAuctionContract({
    contractAddress: "0xad650614Ee4967324e3A95E4223d40ce52BD2B6C",
  });

  useMemo(() => {
    if (data?.endTime && data?.endTime > Math.floor(Date.now() / 1000)) {
      setDisabled(true);
    }
  }, [data]);

  useEffect(() => {
    if (auctionId) {
      dispatch(getMyOfferDetail(Number(auctionId)));
    }
  }, [auctionId, dispatch]);

  const handleClaim = async () => {
    setLoading(true);
    try {
      setLoading(false);
      if (data?.tokenId) {
        await claimNFT(data?.tokenId);
        await claimedNFT(data?.tokenId);
        toast.success("Claim success!");
      }
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false);
      throw error;
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
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 5 }}>
            <img
              src={data?.image}
              alt=""
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Grid2>
          <Grid2 size={{ xs: 7 }}>
            <Typography variant="h2" color="text.primary">
              {data?.name}
            </Typography>
            <Tooltip title={data?.seller} placement="bottom-start">
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={600}
                mt={1}
              >
                Owner by {""}
                <Typography
                  variant="body1"
                  color="text.tertiary"
                  fontWeight={600}
                  component="span"
                  sx={{ cursor: "pointer" }}
                >
                  {formatAddress(data?.seller || "")}
                </Typography>
              </Typography>
            </Tooltip>
            <Paper sx={{ mt: 2, border: "1px solid #ffffff1f" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderBottom: "1px solid #ffffff1f",
                  py: 2,
                  px: 3,
                }}
              >
                <AccessTimeIcon />
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight={600}
                >
                  Sale ends{" "}
                  {formatTime(data?.endTime || 0, {
                    date: true,
                    time: true,
                  })}
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" color="text.secondary" mb={1}>
                  Current price
                </Typography>
                <Typography variant="h2" color="text.primary" fontWeight={600}>
                  {`${
                    data?.highestBid
                      ? formatNumber(data?.highestBid, {
                          fractionDigits: 2,
                          suffix: "USDT",
                        })
                      : formatNumber(data?.maxPrice || 0, {
                          fractionDigits: 2,
                          suffix: "USDT",
                        })
                  } `}
                </Typography>
                {data?.highestBid && (
                  <Typography variant="body2" color="text.secondary">
                    Highest Bidder: {formatAddress(data.highestBidder)}
                  </Typography>
                )}
              </Box>
              {/* <Box sx={{ px: 3, mb: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "44px" }}
                disabled={disabled}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Buy now
                </Typography>
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ height: "44px" }}
                onClick={handleOpen}
                disabled={disabled}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Make offer
                </Typography>
              </Button>
            </Box> */}
            </Paper>
            {/* <PriceHistory />
          <OfferTable /> */}
            <LoadingButton
              onClick={handleClaim}
              loading={loading}
              variant="contained"
              sx={{ mt: 3, width: "288px", height: "56px" }}
              disabled={disabled}
            >
              <Typography variant="h4" fontWeight={600}>
                Claim
              </Typography>
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
