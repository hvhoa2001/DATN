import { useProductSelector } from "@datn/redux/hook";
import { Box, Grid2, Typography } from "@mui/material";

export default function Info() {
  const { data } = useProductSelector().productDetail;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">{data?.name}</Typography>
      <Typography variant="body1">{data?.price}$</Typography>
      <Box>
        <Typography variant="body1">Select Size</Typography>
        <Grid2 container spacing={2}>
          {data?.variants.map((item) =>
            item.sizes.map((i) => {
              return (
                <Grid2 size={{ xs: 12 / 5 }}>
                  <Box
                    sx={{
                      py: 2,
                      border: "0.7px solid #fff",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography variant="body1">EU {i.size}</Typography>
                  </Box>
                </Grid2>
              );
            })
          )}
        </Grid2>
        <Typography variant="body2">{data?.description}</Typography>
      </Box>
    </Box>
  );
}
