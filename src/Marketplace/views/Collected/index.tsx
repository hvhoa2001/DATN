import { useProductContext } from "@datn/views/Product/context";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Collected() {
  const { ownedNFTsData } = useProductContext();
  const [hover, setHover] = useState<boolean>(false);

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
        <Grid2 container spacing={2} sx={{ width: "100%" }}>
          {ownedNFTsData &&
            ownedNFTsData.map((item) => {
              return (
                <Grid2
                  size={{ xs: 4 }}
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Link
                    to={`/marketplace/collected/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={item.image}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "16px",
                      }}
                    />
                    {!hover && (
                      <Typography variant="body1" color="text.primary">
                        {item.name}
                      </Typography>
                    )}
                    {hover && (
                      <Button
                        variant="contained"
                        sx={{ height: "56px" }}
                        fullWidth
                      >
                        Listing for sale
                      </Button>
                    )}
                  </Link>
                </Grid2>
              );
            })}
        </Grid2>
      </Container>
    </Box>
  );
}
