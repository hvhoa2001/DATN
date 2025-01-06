import { Box, Grid2, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useProductContext } from "../context";

type Props = {
  id: string;
  name: string;
  currentPrice: number;
  price?: number;
  img?: string;
  gender?: string;
  highlight?: string;
  numberColor: number;
  subImg?: Array<string>;
  saleRate?: number;
};

export default function ProductItem({
  name,
  price,
  highlight,
  img,
  numberColor,
  subImg,
  saleRate,
  gender,
  currentPrice,
}: Props) {
  const { setSelectedVariantIndex, selectedVariantIndex } = useProductContext();
  const [hover, setHover] = useState<boolean>(false);

  const useHover = useMemo(() => {
    if (!hover || (hover && numberColor == 1)) {
      return false;
    }
    return true;
  }, [hover]);

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={`${useHover ? subImg?.[selectedVariantIndex] || img : img}`}
        alt="shoe-img"
        style={{
          height: "auto",
          width: "100%",
          marginBottom: "16px",
        }}
      />
      {!useHover && (
        <Box>
          {highlight && (
            <Typography
              variant="body1"
              color="text.tertiary"
              fontWeight={500}
              mb={1}
            >
              {highlight}
            </Typography>
          )}
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={500}
            mb={1}
          >
            {name}
          </Typography>
          {gender && (
            <Typography variant="body1" color="text.secondary" mb={2}>
              {gender}'s Shoes
            </Typography>
          )}
          <Typography variant="body1" color="text.secondary" mb={2}>
            {numberColor} {`${numberColor == 1 ? "Color" : "Colors"}`}
          </Typography>
          {saleRate ? (
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="body1"
                color="text.primary"
                fontWeight={500}
                mr={1}
              >
                {currentPrice}$
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={500}
                sx={{
                  textDecoration: "line-through",
                }}
              >
                {price}$
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body1"
              color="text.primary"
              fontWeight={500}
              mb={2}
            >
              {currentPrice}$
            </Typography>
          )}
          {saleRate && (
            <Typography variant="body1" color="#007d48" fontWeight={600}>
              {saleRate * 100}% off
            </Typography>
          )}
        </Box>
      )}
      {useHover && (
        <Box>
          <Box sx={{ display: "flex", mb: 2 }}>
            {subImg?.map((variant, index) => (
              <img
                key={index}
                src={variant}
                alt={`Variant ${index}`}
                style={{
                  height: "44px",
                  width: "44px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "8px",
                }}
                onMouseEnter={() => {
                  setSelectedVariantIndex(index);
                }}
              />
            ))}
          </Box>
          {highlight && (
            <Typography
              variant="body1"
              color="text.tertiary"
              fontWeight={500}
              mb={1}
            >
              {highlight}
            </Typography>
          )}
          {saleRate ? (
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="body1"
                color="text.primary"
                fontWeight={500}
                mr={1}
              >
                {currentPrice}$
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={500}
                sx={{
                  textDecoration: "line-through",
                }}
              >
                {price}$
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body1"
              color="text.primary"
              fontWeight={500}
              mb={2}
            >
              {currentPrice}$
            </Typography>
          )}
          {saleRate && (
            <Typography variant="body1" color="#007d48" fontWeight={600}>
              {saleRate * 100}% off
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
