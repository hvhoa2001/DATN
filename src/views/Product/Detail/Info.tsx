import FreeDelivery from "@datn/common/Product/FreeDelivery";
import Reviews from "@datn/common/Product/Reviews";
import { useProductSelector } from "@datn/redux/hook";
import { Box, Grid2, Typography } from "@mui/material";

export default function Info() {
  const { data } = useProductSelector().productDetail;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight={600}>
        {data?.name}
      </Typography>
      <Typography variant="body1" fontWeight={600} py={4}>
        {data?.price}$
      </Typography>
      <Box>
        <Typography variant="body1" fontWeight={600}>
          Select Size
        </Typography>
        <Grid2 container spacing={2} sx={{ py: 3 }}>
          {data?.variants?.map((item) =>
            item.sizes.map((i) => {
              return (
                <Grid2 size={{ xs: 12 / 5 }}>
                  <Box
                    sx={{
                      py: 2,
                      border: "0.7px solid #fff",
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
        <Reviews />
      </Box>
    </Box>
  );
}
