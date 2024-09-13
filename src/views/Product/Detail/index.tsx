import { Box, Container } from "@mui/material";

export default function ProductDetail() {
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
        Product Detail Page
      </Container>
    </Box>
  );
}
