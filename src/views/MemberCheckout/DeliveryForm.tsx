import { useUserEmail } from "@datn/hooks/useUserId";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SelectAddress from "./Address";
import { LoadingButton } from "@mui/lab";
import useUSDTContract from "@datn/web3/hooks/useUSDTContract";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { useBalanceUSDT } from "@datn/hooks/useBalance/useBalance";
import { formatNumber } from "@datn/utils/format";
import useNFTsShopContract from "@datn/web3/hooks/useNFTsShopContract";
import { useAccount } from "wagmi";
import { useCommonDataSelector } from "@datn/redux/hook";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "@datn/wagmi/config";

export default function DeliveryForm() {
  const { checkout } = useCommonDataSelector();

  const { faucetUSDT, approve, getAllowance } = useUSDTContract({
    contractAddress: "0x2A3fbEEc03B99A60f357165EaAbF836bDADADD3f",
  });

  const { buyNFT } = useNFTsShopContract({
    contractAddress: "0x16B79CB03D976767477383c5062835e89d65c55b",
  });
  const userEmail = useUserEmail();
  // const userAddress = useUserId();
  const { address: userAddress } = useAccount();

  const [email, setEmail] = useState<string>(userEmail || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // const { data } = useCommonDataSelector().price;
  const [country, setCountry] = useState<string>("Vietnam");
  const [states, setStates] = useState<string>("Hà Nội");
  const balance = useBalanceUSDT({ address: userAddress as `0x${string}` });

  const handleFaucet = async () => {
    setLoading(true);
    try {
      if (userAddress) {
        await faucetUSDT(
          userAddress,
          new BigNumber(1000000).times(new BigNumber(Math.pow(10, 6)))
        );
      }
      toast.success("Success");
      setLoading(false);
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false);
      throw error;
    }
  };

  const handleBuyNFT = async () => {
    setLoading(true);
    try {
      if (checkout.data) {
        const tsx = await approve(
          "0x16B79CB03D976767477383c5062835e89d65c55b",
          new BigNumber(checkout.data.price).times(
            new BigNumber(Math.pow(10, 6))
          )
        );

        await waitForTransactionReceipt(wagmiConfig, {
          hash: tsx,
        });
        await buyNFT(checkout.data.tokenId);
        toast.success("Payment success! Your NFT is on the way!");
        setLoading(false);
      }
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false);
      throw error;
    }
  };

  return (
    <Box>
      <Typography variant="h2" mb={8}>
        Delivery
      </Typography>
      <form>
        <Box mb={3}>
          <Typography variant="h4" mb={3}>
            Enter your name and address:
          </Typography>
          <TextField
            value={firstName}
            type="text"
            label="First Name"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
            // error={helperText.firstName ? true : false}
            sx={{ mb: 3 }}
            // helperText={helperText.firstName || " "}
          />
          <TextField
            value={lastName}
            type="text"
            label="Last Name"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
            // error={helperText.lastName ? true : false}
            sx={{ mb: 3 }}
            // helperText={helperText.lastName || " "}
          />
          <SelectAddress
            country={country}
            states={states}
            handleCountryChange={setCountry}
            handleStateChange={setStates}
          />
          <TextField
            value={address}
            type="text"
            label="Address or postcode"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
            // error={helperText.lastName ? true : false}
            sx={{ mb: 3 }}
            // helperText={helperText.lastName || " "}
          />
        </Box>
        <Box mb={3}>
          <Typography variant="h4" mb={3}>
            What's your contact information
          </Typography>
          <TextField
            // error={helperText.email ? true : false}
            fullWidth
            required
            label="Email Address"
            variant="outlined"
            onChange={(e) => {
              // handleCheckEmail(e);
              setEmail(e.target.value);
            }}
            type="text"
            value={email}
            sx={{ mb: 3 }}
            // helperText={helperText.email || " "}
            // sx={registerInputStyle}
          />
          <TextField
            value={phone}
            type="text"
            label="Phone Number"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
            // error={helperText.firstName ? true : false}
            sx={{ mb: 10 }}
            // helperText={helperText.firstName || " "}
          />
          <Divider />
        </Box>
        <Box>
          <Typography variant="h2" mb={8}>
            Shipping
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Free
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            Shipment One
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Arrives Fri, Oct 4 - Thu, Oct 10
          </Typography>
          <Typography variant="body1" color="text.secondary" my={3}>
            This is an international shipment requiring customs clearance
          </Typography>
          <Divider />
        </Box>

        <Box mt={2}>
          <Typography variant="h2" mb={8}>
            Payment
          </Typography>
          <TextField
            value={1000}
            type="text"
            required
            variant="outlined"
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mb: 1 }}
            disabled
            // error={helperText.firstName ? true : false}
            // helperText={helperText.firstName || " "}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Balance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatNumber(
                new BigNumber(Number(balance.data?.value)).div(1e6).toNumber(),
                { suffix: "USDT" }
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              onClick={handleBuyNFT}
              loading={loading}
              variant="contained"
              sx={{ mt: 4, width: "288px", height: "48px" }}
            >
              <Typography variant="h4" fontWeight={700}>
                Place Order
              </Typography>
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
