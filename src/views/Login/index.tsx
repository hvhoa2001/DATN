import Providers from "@datn/context/Providers";
import { Box, Container } from "@mui/material";
import LoginEmail from "./LoginEmail";
import LoginContextProvider, { useLoginContext } from "./context";

export default function Login() {
  return (
    <Providers>
      <LoginContextProvider>
        <LoginComponent />
      </LoginContextProvider>
    </Providers>
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
      </Container>
    </Box>
  );
}
