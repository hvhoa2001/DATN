import { Box, Container } from "@mui/material";

export default function AdminPage() {
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
        Admin Page
      </Container>
    </Box>
  );
}
