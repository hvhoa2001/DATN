import { postAuctionData } from "@datn/api/services";
import { useBalanceUSDT } from "@datn/hooks/useBalance/useBalance";
import { useAuctionId } from "@datn/hooks/useProductId";
import { formatNumber } from "@datn/utils/format";
import useNFTsAuctionContract from "@datn/web3/hooks/useNFTsAuctionContract";
import useUSDTContract from "@datn/web3/hooks/useUSDTContract";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, TextField, Typography } from "@mui/material";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "@datn/wagmi/config";

type Props = {
  image: string;
  name: string;
  floorPrice: number;
  bestOffer: number;
  currentOffer?: number;
  endTime?: number;
  maxValue: number;
  minValue: number;
};

export default function MakeOffer({
  image,
  name,
  floorPrice,
  bestOffer,
  currentOffer,
  maxValue,
  minValue,
}: Props) {
  const { placeBid } = useNFTsAuctionContract({
    contractAddress: "0xad650614Ee4967324e3A95E4223d40ce52BD2B6C",
  });
  const { approve, getAllowance } = useUSDTContract({
    contractAddress: "0x2A3fbEEc03B99A60f357165EaAbF836bDADADD3f",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [offerValue, setOfferValue] = useState<number>(minValue);
  const { address: userAddress } = useAccount();
  const auctionId = useAuctionId();

  const balance = useBalanceUSDT({ address: userAddress as `0x${string}` });

  const handleMakeOffer = async () => {
    setLoading(true);
    try {
      if (
        userAddress &&
        offerValue &&
        offerValue >= minValue &&
        offerValue <= maxValue
      ) {
        // const a = await getAllowance(
        //   userAddress,
        //   "0x16B79CB03D976767477383c5062835e89d65c55b"
        // );
        const tsx = await approve(
          "0xad650614Ee4967324e3A95E4223d40ce52BD2B6C",
          new BigNumber(offerValue).times(new BigNumber(Math.pow(10, 6)))
        );
        await waitForTransactionReceipt(wagmiConfig, {
          hash: tsx,
        });
        await placeBid(
          Number(auctionId),
          new BigNumber(offerValue).times(new BigNumber(Math.pow(10, 6)))
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

  return (
    <Paper sx={{ p: 3, width: "600px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Typography variant="h4">Make an Offer</Typography>
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
        fullWidth
        type="number"
        sx={{ my: 2 }}
        label="Offer value"
        error={offerValue < minValue || offerValue > maxValue}
        helperText={
          offerValue < minValue || offerValue > maxValue
            ? `Offer value must be between ${formatNumber(minValue, {
                fractionDigits: 2,
                suffix: "USDT",
              })} and ${formatNumber(maxValue, {
                fractionDigits: 2,
                suffix: "USDT",
              })}`
            : ""
        }
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <LoadingButton
          disabled={!offerValue}
          variant="contained"
          loading={loading}
          onClick={handleMakeOffer}
        >
          Make offer
        </LoadingButton>
      </Box>
    </Paper>
  );
}
