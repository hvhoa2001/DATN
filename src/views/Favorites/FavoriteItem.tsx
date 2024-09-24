import { Box, Typography } from "@mui/material";

type Props = {
  name: string;
  image: string;
  price: number;
};

export default function FavoriteItem({ name, image, price }: Props) {
  return (
    <Box sx={{ width: "400px", px: 2 }}>
      <img
        src={image}
        alt="img"
        style={{
          width: "100%",
          height: "356px",
          borderRadius: "4px",
          position: "relative",
        }}
      ></img>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1,
        }}
      >
        <Typography variant="body1" color="text.primary">
          {name}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {price}$
        </Typography>
      </Box>
    </Box>
  );
}
