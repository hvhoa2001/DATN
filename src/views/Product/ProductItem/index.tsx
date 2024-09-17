import { Box, Typography } from "@mui/material";

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
  return (
    <Box>
      <img
        src={img}
        alt="shoe-img"
        style={{
          height: "auto",
          width: "100%",
          marginBottom: "16px",
        }}
      />
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
      <Typography variant="body1" fontWeight={500} mb={1}>
        {name}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {numberColor} {`${numberColor == 1 ? "Color" : "Colors"}`}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {price}
      </Typography>
    </Box>
  );
}
