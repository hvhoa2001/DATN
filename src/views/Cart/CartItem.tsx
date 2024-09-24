import { Box, IconButton, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

type Props = {
  name: string;
  color: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
};

export default function CartItem({
  name,
  color,
  size,
  price,
  quantity,
  image,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <img
          src={image}
          alt={name}
          style={{
            height: "164px",
            width: "164px",
            marginRight: "12px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight={600} mb={1}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {color}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography variant="body2" color="text.secondary" mr={2}>
                Size: {size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {quantity}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <IconButton>
              <FavoriteBorderIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <DeleteOutlinedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Typography variant="body1" fontWeight={600}>
        {price}$
      </Typography>
    </Box>
  );
}
