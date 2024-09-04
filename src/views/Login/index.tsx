import Providers from "@datn/context/Providers";
import { Box, Container } from "@mui/material";
import LoginEmail from "./LoginEmail";
import LoginContextProvider, { useLoginContext } from "./context";
import Register from "./Register";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Login() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Providers>
        <LoginContextProvider>
          <LoginComponent />
        </LoginContextProvider>
      </Providers>
    </LocalizationProvider>
  );
}

function LoginComponent() {
  const { step } = useLoginContext();
  return (
    <Box component={"section"}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100svh",
        }}
      >
        {step == 0 && <LoginEmail />}
        {step == 1 && <Register />}
      </Container>
    </Box>
  );
}
