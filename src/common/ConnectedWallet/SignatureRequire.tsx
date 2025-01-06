import { useAppDispatch } from "@datn/redux/hook";
import { useAccount } from "wagmi";
import { StateStatus } from "../component";
import { useCallback, useEffect, useMemo, useState } from "react";
import { walletsConfig } from "@datn/config/wallets";
import { hexlify, toUtf8Bytes } from "ethers";
import { LoginWallet } from "@datn/api/services";
import { updateAuthState } from "@datn/redux/slices/auth-end-user";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import BootstrapDialogTitle from "../primitives/Dialog";
import {
  deleteAPIJwt,
  setAPIJwt,
  getAPIJwt,
  getAPPStorage,
  setAPPStorage,
} from "@datn/utils/storage/authStorage";

type Props = {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
};

export default function SignatureRequire({
  handleClose,
  handleOpen,
  open,
}: Props) {
  const { address, connector } = useAccount();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<StateStatus>("IDLE");
  const connectorConfig = useMemo(() => {
    return walletsConfig().find(
      (config) => config.connectorId === connector?.id
    );
  }, [connector]);
  const getWalletJwt = useCallback(async () => {
    try {
      deleteAPIJwt("portfolio");
      localStorage.removeItem("role");
      setStatus("PROCESSING");
      const provider: any = await connector?.getProvider();
      const nonce = Math.round(Math.random() * 1e6);
      const msg = `I am signing my one-time nonce: ${nonce}.`;
      let signature = "";
      try {
        signature = await provider.request({
          method: "personal_sign",
          params: [hexlify(toUtf8Bytes(msg)), address?.toLocaleLowerCase()],
        });
      } catch (error) {
        console.log("🚀 ~ getWalletJwt ~ error:", error);
      }
      if (signature) {
        const res = await LoginWallet({
          address: String(address),
          nonce: nonce,
          signature: signature,
        });
        if (res.jwt) {
          setAPIJwt("portfolio", res.jwt);
          localStorage.setItem("role", res.role);
          dispatch(updateAuthState(true));
          handleClose();
        }
      }
      setStatus("SUCCESS");
    } catch (error) {
      //pass
      setStatus("FAILED");
    }
  }, [address, handleClose, connector, dispatch]);
  useEffect(() => {
    const walletJwt = getAPIJwt("portfolio");
    const skipSignWallet = Boolean(getAPPStorage("skipWalletVerification"));
    if (!walletJwt && !skipSignWallet) {
      localStorage.removeItem("jwt");
      dispatch(updateAuthState(false));
      handleOpen();
    }
  }, [dispatch, handleOpen]);
  return (
    <Dialog open={open} fullWidth maxWidth={"xs"}>
      <BootstrapDialogTitle
        onClose={() => {
          handleClose();
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {connectorConfig?.icon && (
          <img
            src={connectorConfig?.icon || ""}
            style={{ width: "60px", height: "60px" }}
            alt="wallet"
          />
        )}
      </Box>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
        <Typography variant="h4" align="center" mt={3}>
          Welcome to NikeChain
        </Typography>

        <Typography variant="body2" mt={3} align="center">
          Prove you are the holder of the address.
        </Typography>

        <Divider sx={{ my: 3 }} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={getWalletJwt}
          disabled={status === "PROCESSING"}
        >
          Verify your address
        </Button>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 2, cursor: "pointer" }}
          onClick={() => {
            setAPPStorage("skipWalletVerification", "true");
            handleClose();
          }}
        >
          Skip
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
