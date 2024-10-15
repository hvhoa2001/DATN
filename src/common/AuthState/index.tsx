import { useAuthContext } from "@datn/context/AuthContext";
import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import {
  Box,
  IconButton,
  Link,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import React, { useEffect, useState } from "react";
import { getUserProfile } from "@datn/redux/slices/common/fetchFunction";
import useUserId from "@datn/hooks/useUserId";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

export default function AuthState() {
  const { isLoggedIn, checkAuthState, logout } = useAuthContext();
  const { data } = useCommonDataSelector().userProfile;
  const userId = useUserId();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [userId, dispatch]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center" }}
      onClick={handleClick}
      component="span"
    >
      {isLoggedIn && (
        <Box sx={{ cursor: "pointer" }}>
          <Typography variant="body2" sx={{ textWrap: "nowrap" }}>
            {data?.userName}
          </Typography>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            disableEnforceFocus
            disableAutoFocus
            disableScrollLock={true}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  overflow: "hidden",
                },
              },
            }}
          >
            <MenuItem
              sx={{
                height: "46px",
              }}
            >
              {/* <Link href="/profile" sx={{ textDecoration: "none" }}> */}
              <PersonIcon sx={{ mr: 1 }} />
              <Typography variant="body2" color={"text.secondary"}>
                Profile
              </Typography>
              {/* </Link> */}
            </MenuItem>
            <MenuItem
              sx={{
                height: "46px",
              }}
              onClick={handleLogout}
            >
              <LogoutIcon sx={{ mr: 1 }} />
              <Typography variant="body2" color={"text.secondary"}>
                Log out
              </Typography>
            </MenuItem>
          </Popover>
        </Box>
      )}
      {!isLoggedIn && (
        <Link href="/login" sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.primary">
            Login
          </Typography>
        </Link>
      )}
      <IconButton>
        <Person2OutlinedIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
