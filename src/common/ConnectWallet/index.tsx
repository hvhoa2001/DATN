import { WalletConfig, walletsConfig } from "@datn/config/wallets";
import useDialogState from "@datn/hooks/useDialogState";
import {
  Box,
  Button,
  Dialog,
  Grid2,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import WalletItem from "./components/WalletItem";
import WalletContent from "./components/WalletConnect";
import LoginIcon from "@mui/icons-material/Login";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import { CloseIcon } from "../icons";

export default function ConnectWallet() {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ whiteSpace: "nowrap" }}
      >
        Login with Web3 ID
      </Button>
      <Dialog
        PaperProps={{
          style: {
            maxWidth: "2000px",
          },
        }}
        open={open}
      >
        <Content handleClose={handleClose} />
      </Dialog>
    </Box>
  );
}

const Content = ({ handleClose }: { handleClose: () => void }) => {
  const [selectedWallet, setSlectedWallet] = useState<WalletConfig>();
  return (
    <Paper sx={{ width: "900px", position: "relative" }}>
      <Grid2 container>
        <Grid2
          size={{ xs: 12, sm: 6 }}
          sx={{ backgroundColor: "#0E1D27", py: 3 }}
        >
          <Box sx={{ px: 3 }}>
            <Typography variant="h4" color={"text.primary"}>
              Login with Web3 ID
            </Typography>
            <Typography variant="body2" my={3} color="text.primary">
              Start by connecting with one of the wallets below. Be sure to
              store your private keys or seed phrase securely. Never share them
              with anyone.
            </Typography>
          </Box>
          <Grid2
            container
            spacing={1}
            sx={{ height: "300px", overflowY: "auto" }}
            className="custom-scrollbar"
          >
            {walletsConfig().map((wallet) => {
              return (
                <Grid2
                  size={{ xs: 4 }}
                  key={wallet.id}
                  onClick={() => {
                    setSlectedWallet(wallet);
                  }}
                >
                  <WalletItem wallet={wallet} />
                </Grid2>
              );
            })}
          </Grid2>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 6 }}
          sx={{
            backgroundColor: "background.paper",
            p: 3,
            "& .row-container": {
              display: "flex",
              alignItems: "flex-start",
              my: 1,
            },
            "& .icon-container": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50px",
              height: "50px",
              borderRadius: "13px",
              padding: 3,
              backgroundColor: "#1C252C",
              overflow: "hidden",
              mr: 2,
            },
          }}
        >
          {!selectedWallet && <NonSelected />}
          {selectedWallet && <WalletContent wallet={selectedWallet} />}
        </Grid2>
      </Grid2>
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", top: "12px", right: "12px" }}
      >
        <CloseIcon sx={{ fontSize: "1rem" }} />
      </IconButton>
    </Paper>
  );
};

const NonSelected = () => {
  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        {`What's a Web3 Wallet?`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
        }}
      >
        <Box className="row-container">
          <Box className="icon-container">
            <LoginIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              mb={0.5}
            >
              Login using a wallet connection
            </Typography>
            <Typography variant="body2" color="text.label1">
              Connect your wallet with simple clicks instead of creating a new
              account.
            </Typography>
          </Box>
        </Box>
        <Box className="row-container">
          <Box className="icon-container">
            <AccountBalanceWalletOutlinedIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              mb={0.5}
            >
              Managing digital assets in an all-in-one place
            </Typography>
            <Typography variant="body2" color="text.label1">
              Send, receive, store, and display digital assets like Bitcoin and
              NFTs with a wallet.
            </Typography>
          </Box>
        </Box>
        <Box className="row-container">
          <Box className="icon-container">
            <AnalyticsOutlinedIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              mb={0.5}
            >
              Take control of your finance
            </Typography>
            <Typography variant="body2" color="text.label1">
              Not being limited to exchanging assets in the decentralized
              markets.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
