import { Box, Container } from "@mui/material";

export default function Cart() {
  return (
    <Box component={"section"}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 10,
        }}
      >
        Cart Page
      </Container>
    </Box>
  );
}
