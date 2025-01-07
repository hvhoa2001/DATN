import useDialogState from "@datn/hooks/useDialogState";
import MakeOffer from "@datn/Marketplace/components/MakeOffer";
import { formatAddress, formatNumber, formatTime } from "@datn/utils/format";
import { useProductContext } from "@datn/views/Product/context";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Box,
  Button,
  Container,
  Dialog,
  Grid2,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import AuctionDescription from "./AuctionDescription";
import OfferTable from "./OfferTable";
import PriceHistory from "./PriceHistory";

export default function AuctionDetail() {
  const { auctionDetail } = useProductContext();
  const { handleOpen, open, handleClose } = useDialogState();

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
            <AuctionDescription
              description={auctionDetail?.description || ""}
              addressContract={auctionDetail?.nftContract || ""}
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
                  py: 2,
                  px: 3,
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
                  {formatNumber(auctionDetail?.maxPrice || 0, {
                    fractionDigits: 2,
                    suffix: "USDT",
                  })}
                </Typography>
              </Box>
              <Box sx={{ px: 3, mb: 3, display: "flex", gap: 2 }}>
                <Button variant="contained" fullWidth sx={{ height: "44px" }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Buy now
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ height: "44px" }}
                  onClick={handleOpen}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Make offer
                  </Typography>
                </Button>
              </Box>
            </Paper>
            <PriceHistory />
            <OfferTable />
          </Grid2>
        </Grid2>
        <Box>
          <Dialog open={open} onClose={handleClose}>
            <MakeOffer
              image={auctionDetail?.image || ""}
              name={auctionDetail?.name || ""}
              floorPrice={0}
              bestOffer={auctionDetail?.highestBid || 0}
            />
          </Dialog>
        </Box>
      </Container>
    </Box>
  );
}
