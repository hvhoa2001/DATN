import { Box, Grid2, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useProductContext } from "../context";
import { useProductSelector } from "@datn/redux/hook";

type Props = {
  name: string;
  price: number;
  img?: string;
  highlight?: string;
  numberColor: number;
};

export default function ProductItem({
  name,
  price,
  highlight,
  img,
  numberColor,
}: Props) {
  const { setSelectedVariantIndex, selectedVariantIndex, selectedVariant } =
    useProductContext();
  const { data } = useProductSelector().productDetail;
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
        src={`${useHover ? selectedVariant?.preview || img : img}`}
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
          <Typography variant="body1" color="text.secondary" mb={2}>
            {numberColor} {`${numberColor == 1 ? "Color" : "Colors"}`}
          </Typography>
          <Typography variant="body1" color="text.primary" fontWeight={500}>
            {price}$
          </Typography>
        </Box>
      )}
      {useHover && (
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
                onMouseEnter={() => {
                  setSelectedVariantIndex(index);
                }}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
}
