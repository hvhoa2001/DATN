import { formatAddress, formatNumber, formatTime } from "@datn/utils/format";
import { useProductContext } from "@datn/views/Product/context";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

export default function AuctionDetail() {
  const { auctionDetail } = useProductContext();
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
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 5 }}>
            <img
              src={auctionDetail?.image}
              alt=""
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Grid2>
          <Grid2 size={{ xs: 7 }}>
            <Typography variant="h2" color="text.primary">
              {auctionDetail?.name}
            </Typography>
            <Tooltip title={auctionDetail?.seller} placement="bottom-start">
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={600}
                mt={1}
              >
                Owner by {""}
                <Typography
                  variant="body1"
                  color="text.tertiary"
                  fontWeight={600}
                  component="span"
                  sx={{ cursor: "pointer" }}
                >
                  {formatAddress(auctionDetail?.seller || "")}
                </Typography>
              </Typography>
            </Tooltip>
            <Paper sx={{ mt: 2, border: "1px solid #ffffff1f" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderBottom: "1px solid #ffffff1f",
                  p: 3,
                }}
              >
                <AccessTimeIcon />
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight={600}
                >
                  Sale ends{" "}
                  {formatTime(auctionDetail?.endTime || 0, {
                    date: true,
                    time: true,
                  })}
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" color="text.secondary" mb={1}>
                  Current price
                </Typography>
                <Typography variant="h2" color="text.primary" fontWeight={600}>
                  {auctionDetail?.highestBid == 0
                    ? "No bids yet"
                    : `${formatNumber(auctionDetail?.highestBid || 0, {
                        fractionDigits: 2,
                        suffix: "USDT",
                      })}`}
                </Typography>
              </Box>
              <Box sx={{ px: 3, mb: 3, display: "flex", gap: 2 }}>
                <Button variant="contained" fullWidth sx={{ height: "56px" }}>
                  <Typography variant="h4" fontWeight={600}>
                    Buy now
                  </Typography>
                </Button>
                <Button variant="outlined" fullWidth sx={{ height: "56px" }}>
                  <Typography variant="h4" fontWeight={600}>
                    Make offer
                  </Typography>
                </Button>
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
