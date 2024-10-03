import { Box, Divider, IconButton, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAppDispatch } from "@datn/redux/hook";
import { deleteCartItem } from "@datn/api/services";
import { getCartItems } from "@datn/redux/slices/common/fetchFunction";

type Props = {
  productId: string;
  name: string;
  color: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
  checkQuantity: boolean;
};

export default function CartItem({
  name,
  color,
  size,
  price,
  quantity,
  image,
  productId,
  checkQuantity,
}: Props) {
  const dispatch = useAppDispatch();
  const handleDelete = async (productId: string) => {
    try {
      await deleteCartItem(productId);
      dispatch(getCartItems());
    } catch (err) {
      throw err;
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          opacity: checkQuantity ? 1 : 0.5,
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
              <IconButton
                onClick={() => {
                  handleDelete(productId);
                }}
              >
                <DeleteOutlinedIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Typography variant="body1" fontWeight={600}>
          {price}$
        </Typography>
      </Box>
      <Divider sx={{ my: 8 }} />
    </Box>
  );
}
