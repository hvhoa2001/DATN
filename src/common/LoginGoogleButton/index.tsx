import { Box, Button } from "@mui/material";

export default function LoginGoogleButton() {
  const handleLogin = () => {
    window.open("http://localhost:3003/auth/google-login", "_self");
  };

  return (
    <Box>
      <Button onClick={handleLogin} variant="contained">
        Log in with Google
      </Button>
    </Box>
  );
}
