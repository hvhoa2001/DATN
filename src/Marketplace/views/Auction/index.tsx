import { useProductContext } from "@datn/views/Product/context";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Auction() {
  const { auctionList } = useProductContext();
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
        <Grid2 container spacing={2}>
          {auctionList?.map((item, index) => (
            <Grid2 size={{ xs: 4 }} key={index}>
              <Link
                to={`/marketplace/auction/${item.tokenId}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="text.secondary"
                >
                  {item.name}
                </Typography>
              </Link>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
