import { Box, Container, Grid2 } from "@mui/material";
import OrderSummary from "./OrderSummary";

export default function MemberCheckout() {
  return (
    <Box component="section">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 10,
        }}
      >
        <Grid2
          container
          spacing={4}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <OrderSummary />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
