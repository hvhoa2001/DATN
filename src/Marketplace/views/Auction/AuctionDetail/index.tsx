import useDialogState from "@datn/hooks/useDialogState";
import MakeOffer from "@datn/Marketplace/components/MakeOffer";
import { formatAddress, formatNumber, formatTime } from "@datn/utils/format";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Box,
  Button,
  Container,
  Dialog,
  Grid2,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import AuctionDescription from "./AuctionDescription";
import OfferTable from "./OfferTable";
import PriceHistory from "./PriceHistory";
import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { useEffect, useMemo, useState } from "react";
import { useAuctionId } from "@datn/hooks/useProductId";
import { getAuctionDetail } from "@datn/redux/slices/common/fetchFunction";
import { useAccount } from "wagmi";
import useNFTsAuctionContract from "@datn/web3/hooks/useNFTsAuctionContract";
import useUSDTContract from "@datn/web3/hooks/useUSDTContract";
import BigNumber from "bignumber.js";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "@datn/wagmi/config";
import { postAuctionData } from "@datn/api/services";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

export default function AuctionDetail() {
  const { data } = useCommonDataSelector().auctionDetail;
  const { handleOpen, open, handleClose } = useDialogState();
  const [disabled, setDisabled] = useState(false);
  const { address: userAddress } = useAccount();
  const auctionId = useAuctionId();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const { placeBid } = useNFTsAuctionContract({
    contractAddress: "0xad650614Ee4967324e3A95E4223d40ce52BD2B6C",
  });
  const { approve } = useUSDTContract({
    contractAddress: "0x2A3fbEEc03B99A60f357165EaAbF836bDADADD3f",
  });

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      if (userAddress && data?.maxPrice) {
        // const a = await getAllowance(
        //   userAddress,
        //   "0x16B79CB03D976767477383c5062835e89d65c55b"
        // );
        const tsx = await approve(
          "0xad650614Ee4967324e3A95E4223d40ce52BD2B6C",
          new BigNumber(data?.maxPrice).times(new BigNumber(Math.pow(10, 6)))
        );
        await waitForTransactionReceipt(wagmiConfig, {
          hash: tsx,
        });
        await placeBid(
          Number(auctionId),
          new BigNumber(data?.maxPrice).times(new BigNumber(Math.pow(10, 6)))
        );

        const res = await postAuctionData(Number(auctionId));
        console.log("🚀 ~ handleMakeOffer ~ res:", res);
        toast.success("Offer success!");
        setLoading(false);
      }
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false);
      throw error;
    }
  };

  useMemo(() => {
    if (data?.highestBid && data?.highestBidder === userAddress) {
      setDisabled(true);
    }
  }, [data, userAddress]);

  useEffect(() => {
    if (auctionId) {
      dispatch(getAuctionDetail(Number(auctionId)));
    }
  }, [dispatch, auctionId]);

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
            <AuctionDescription
              description={data?.description || ""}
              addressContract={data?.nftContract || ""}
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
              <Box sx={{ px: 3, mb: 3, display: "flex", gap: 2 }}>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  fullWidth
                  sx={{ height: "44px" }}
                  disabled={disabled}
                  onClick={handleBuyNow}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Buy now
                  </Typography>
                </LoadingButton>
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
              </Box>
            </Paper>
            <PriceHistory />
            <OfferTable />
          </Grid2>
        </Grid2>
        <Box>
          <Dialog open={open} onClose={handleClose}>
            <MakeOffer
              image={data?.image || ""}
              name={data?.name || ""}
              floorPrice={0}
              bestOffer={data?.highestBid || 0}
              maxValue={data?.maxPrice || 0}
              minValue={data?.minPrice || 0}
            />
          </Dialog>
        </Box>
      </Container>
    </Box>
  );
}
