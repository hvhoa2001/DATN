import FreeDelivery from "@datn/common/Product/FreeDelivery";
import Reviews from "@datn/common/Product/Reviews";
import { useProductSelector } from "@datn/redux/hook";
import { Box, Button, Grid2, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Info() {
  const { data } = useProductSelector().productDetail;

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography variant="h4" fontWeight={600}>
        {data?.name}
      </Typography>
      <Typography variant="body1" fontWeight={600} py={4}>
        {data?.price}$
      </Typography>
      <Grid2 container sx={{ mb: 4 }}>
        {data?.variants?.map((item) => {
          return (
            <Grid2 size={{ xs: 12 / 5 }}>
              <img
                src={item.preview}
                style={{ height: "70px", width: "70px", borderRadius: "4px" }}
              />
            </Grid2>
          );
        })}
      </Grid2>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            Select Size
          </Typography>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.secondary"
            sx={{ cursor: "pointer" }}
          >
            Size Guide
          </Typography>
        </Box>
        <Grid2 container spacing={2} sx={{ my: 3 }}>
          {data?.variants?.map((item) =>
            item.sizes.map((i) => {
              return (
                <Grid2 size={{ xs: 12 / 5 }}>
                  <Box
                    sx={{
                      py: 2,
                      border: "0.8px solid #D1D1D1",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="body1">EU {i.size}</Typography>
                  </Box>
                </Grid2>
              );
            })
          )}
        </Grid2>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: "20px", height: "56px", mb: 2 }}
        >
          <Typography variant="body1" fontWeight={600}>
            Add to Bag
          </Typography>
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ borderRadius: "20px", height: "56px" }}
          endIcon={<FavoriteBorderIcon />}
        >
          <Typography variant="body1" fontWeight={600}>
            Favorite
          </Typography>
        </Button>
      </Box>

      <Typography variant="body1">{data?.description}</Typography>
      <ul>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>Color Shown:</Typography>
        </li>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>Style: {data?.style}</Typography>
        </li>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>Country/Region of Origin: {data?.madeIn}</Typography>
        </li>
      </ul>
      <Box sx={{ mb: 2 }}>
        <FreeDelivery />
      </Box>
      <Reviews numberOfRating={100} rating={4.6} />
    </Box>
  );
}
