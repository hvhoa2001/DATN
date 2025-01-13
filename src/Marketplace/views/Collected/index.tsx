import NoData from "@datn/common/Nodata";
import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { getUserNFT } from "@datn/redux/slices/common/fetchFunction";
import useNFTsAuctionContract from "@datn/web3/hooks/useNFTsAuctionContract";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Collected() {
  const { userNFT } = useCommonDataSelector();
  const [hover, setHover] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserNFT());
  }, [dispatch]);

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
        {userNFT.status === "SUCCESS" && (userNFT?.data?.length || 0) > 0 && (
          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            {userNFT &&
              userNFT.data?.map((item) => {
                return (
                  <Grid2
                    size={{ xs: 4 }}
                    key={item.tokenId}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <Link
                      to={`/marketplace/collected/${item.tokenId}`}
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
        )}
        {userNFT.status === "SUCCESS" && userNFT.data?.length === 0 && (
          <NoData text="No NFTs collected yet" />
        )}
      </Container>
    </Box>
  );
}
