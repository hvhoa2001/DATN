import { useAuthContext } from "@datn/context/AuthContext";
import { useCommonDataSelector } from "@datn/redux/hook";
import { Box, IconButton, Link, Tooltip, Typography } from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

export default function AuthState() {
  const { isLoggedIn } = useAuthContext();
  const { data } = useCommonDataSelector().userProfile;
  return (
    <Box>
      {isLoggedIn && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{data?.userName}</Typography>
        </Box>
      )}
      {isLoggedIn === false && <Typography>Login</Typography>}
      <Link href="/login">
        <Tooltip title="Log in">
          <IconButton>
            <Person2OutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );
}
