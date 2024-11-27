import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useDialogState from "@datn/hooks/useDialogState";
import { CopyIcon, WalletIcon } from "../icons";
import { formatAddress } from "@datn/utils/format";
import SignatureRequire from "./SignatureRequire";
import {
  deleteAPIJwt,
  getAPIJwt,
  removeAPPStorage,
} from "@datn/utils/storage/authStorage";
import useUserId from "@datn/hooks/useUserId";
import { useAppDispatch } from "@datn/redux/hook";
import { getUserProfile } from "@datn/redux/slices/common/fetchFunction";

export default function ConnectedWallet() {
  const { address } = useAccount();
  const [openUserProfile, setOpenUserProfile] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userId = useUserId();
  const dispatch = useAppDispatch();
  const {
    handleClose: closeRequireSig,
    handleOpen: openRequireSig,
    open: requireSig,
  } = useDialogState();

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenUserProfile(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setOpenUserProfile(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [userId, dispatch]);

  return (
    <Box sx={{ position: "relative" }}>
      <SignatureRequire
        handleClose={closeRequireSig}
        handleOpen={openRequireSig}
        open={requireSig}
      />
      <Button variant="contained" onClick={handleOpen}>
        <WalletIcon fontSize="large" sx={{ mr: 1 }} />{" "}
        {formatAddress(String(address))}
      </Button>
      {address && (
        <div
          id="ga4-trava-connected-wallet"
          style={{
            position: "absolute",
            zIndex: -1000000,
            overflow: "hidden",
            width: "1px",
            color: "transparent",
          }}
          key={address}
        >
          {address}
        </div>
      )}
      <Popover
        anchorEl={anchorEl}
        open={openUserProfile}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleCloseProfile}
        slotProps={{
          paper: {
            style: {
              backgroundColor: "transparent",
              borderRadius: "16px",
            },
          },
        }}
      >
        <Content onLoginClick={openRequireSig} />
      </Popover>
    </Box>
  );
}

const Content = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const checkVerifiedWallet = useCallback(() => {
    try {
      const portfolioJwt = getAPIJwt("portfolio");
      if (portfolioJwt) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, [address]);

  const verified = checkVerifiedWallet();

  const handleDisConnect = () => {
    disconnect();
    deleteAPIJwt(`portfolio`);
    removeAPPStorage("skipWalletVerification");
    localStorage.removeItem(`wagmi.${connector?.id}.shimDisconnect`);
    localStorage.removeItem("role");
  };
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <WalletIcon fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight={600}>
          {formatAddress(String(address))}
        </Typography>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(String(address)).then(() => {
              toast.success("Coppied to clipboard!");
            });
          }}
        >
          <CopyIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "0px",
          borderTop: "1px solid",
          borderColor: "divider",
          my: 2,
        }}
      />
      {verified && (
        <>
          <Box
            sx={{
              "& .item": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                borderRadius: 2,
                mt: 1,
                textDecoration: "none",
                mr: 1,
                width: "100%",
                color: "text.active",
              },
            }}
          >
            <MenuItem
              component={"a"}
              target="_blank"
              href="/portfolio"
              className="item"
            >
              <Typography variant="body2" fontWeight={500} color="text.primary">
                My Portfolio
              </Typography>
            </MenuItem>
            <MenuItem
              component={"a"}
              href="/profile"
              target="_self"
              className="item"
            >
              <Typography variant="body2" fontWeight={500} color="text.primary">
                My Profile
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 3,
                cursor: "pointer",
              }}
              onClick={handleDisConnect}
              className="item"
            >
              <Typography variant="body2" color="text.primary" fontWeight={500}>
                Disconnect
              </Typography>
              <LogoutIcon sx={{ color: "text.primary", fontSize: "1rem" }} />
            </MenuItem>
          </Box>
        </>
      )}
      {!verified && (
        <Box>
          <Typography variant="body1" fontWeight={600} mb={2}>
            Log into Centic
          </Typography>
          <Typography variant="body2" color="text.label1">
            Prove you are the holder of the address.
          </Typography>
          <Button
            size="small"
            sx={{ my: 2 }}
            variant="contained"
            fullWidth
            onClick={onLoginClick}
          >
            Login
          </Button>
          <Button
            size="small"
            variant="outlined"
            fullWidth
            onClick={handleDisConnect}
          >
            Disconnect
          </Button>
        </Box>
      )}
    </Paper>
  );
};
