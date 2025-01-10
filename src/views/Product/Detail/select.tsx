import { Box, Grid2, Typography } from "@mui/material";
import { useAppDispatch, useProductSelector } from "@datn/redux/hook";
import { useState } from "react";
import { selectSize } from "@datn/redux/slices/product";

export default function Select() {
  const { data } = useProductSelector().NFTDetail;
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const handleSizeClick = (size: number) => {
    setSelectedSize(size);
  };

  return (
    <Box>
      <Grid2 container sx={{ mb: 4 }} spacing={2}>
        <Grid2 size={12 / 5}>
          <img
            src={data?.image}
            alt={`Variant`}
            style={{
              height: "70px",
              width: "70px",
              borderRadius: "4px",
              border: "1px solid #FFFFFF",
              cursor: "pointer",
            }}
          />
        </Grid2>
      </Grid2>

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

      <Grid2 container spacing={1} sx={{ my: 3 }}>
        {data?.sizes?.map((size, index) => (
          <Grid2 key={`${index}-${size}`} size={12 / 5}>
            <Box
              onClick={() => {
                handleSizeClick(size);
                dispatch(selectSize(size));
              }}
              sx={{
                py: 2,
                border:
                  selectedSize === size
                    ? "1px solid #FFFFFF"
                    : "1px solid #7E7E7E",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="body1">EU {size}</Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
