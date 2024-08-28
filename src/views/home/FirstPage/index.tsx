import { Box, Container } from "@mui/material";
import JDImg from "/images/jordan.png";

export default function FirstPage() {
  return (
    <Box
      component={"section"}
      sx={{
        overflow: "hidden",
        backgroundImage: 'url("/images/first-page.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        sx={{
          height: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img
            src={JDImg}
            alt="img"
            style={{
              maxWidth: "600px",
              transform: "rotate(20deg) scaleX(-1)",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
