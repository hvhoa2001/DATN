import NoData from "@datn/common/Nodata";
import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { getMyOffer } from "@datn/redux/slices/common/fetchFunction";
import { formatNumber, formatTime } from "@datn/utils/format";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MyOffers() {
  const { data, status } = useCommonDataSelector().myOffer;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyOffer());
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
        {status === "SUCCESS" && (data?.length || 0) > 0 && (
          <Grid2 container spacing={2}>
            {data &&
              data.map((item) => {
                return (
                  <Grid2 size={{ xs: 4 }} key={item.tokenId}>
                    <Link
                      to={`/marketplace/my-offers/${item.auctionId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="text.primary"
                        mt={1}
                        fontWeight={600}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Your bid:{" "}
                        {formatNumber(item.highestBid, { fractionDigits: 2 })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Ends at:{" "}
                        {formatTime(item.endTime, { date: true, time: true })}
                      </Typography>
                    </Link>
                  </Grid2>
                );
              })}
          </Grid2>
        )}
        {status === "SUCCESS" && (data?.length || 0) === 0 && (
          <NoData text="You don't have any offers" />
        )}
      </Container>
    </Box>
  );
}
