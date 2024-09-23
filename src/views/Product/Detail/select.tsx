import { useProductSelector } from "@datn/redux/hook";
import { Box, Grid2, Typography } from "@mui/material";
import { useState } from "react";

export default function Select() {
  const { data } = useProductSelector().productDetail;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const selectedVariant = data?.variants?.[selectedVariantIndex];

  return (
    <Box>
      <Grid2 container sx={{ mb: 4 }} spacing={2}>
        {data?.variants?.map((variant, index) => (
          <Grid2 key={index} size={{ xs: 12 / 5 }}>
            <img
              src={variant.preview}
              alt={`Variant ${index}`}
              style={{
                height: "70px",
                width: "70px",
                borderRadius: "4px",
                border:
                  selectedVariantIndex === index
                    ? "1px solid #FFFFFF"
                    : "1px solid #7E7E7E",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedVariantIndex(index);
                setSelectedSize(null);
              }}
            />
          </Grid2>
        ))}
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

      {selectedVariant ? (
        <Grid2 container spacing={2} sx={{ my: 3 }}>
          {selectedVariant.sizes?.map((sizeObj, sizeIndex) => (
            <Grid2 key={sizeIndex} size={{ xs: 12 / 5 }}>
              <Box
                sx={{
                  py: 2,
                  border:
                    selectedSize === sizeObj.size
                      ? "1px solid #FFFFFF"
                      : "1px solid #7E7E7E",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  cursor: sizeObj.stockQuantity > 0 ? "pointer" : "not-allowed",
                  opacity: sizeObj.stockQuantity > 0 ? 1 : 0.5,
                }}
                onClick={() => {
                  if (sizeObj.stockQuantity > 0) {
                    setSelectedSize(sizeObj.size);
                  }
                }}
              >
                <Typography variant="body1">EU {sizeObj.size}</Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Please select a color first.
        </Typography>
      )}
    </Box>
  );
}
