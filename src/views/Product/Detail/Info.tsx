import FreeDelivery from "@datn/common/Product/FreeDelivery";
import Reviews from "@datn/common/Product/Reviews";
import { useProductSelector } from "@datn/redux/hook";
import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createCartItem, createFavorite } from "@datn/api/services";
import useProductId from "@datn/hooks/useProductId";
import Select from "./select";
import { useProductContext } from "../context";

export default function Info() {
  const productId = useProductId();
  const { data } = useProductSelector().productDetail;
  const { selectedSize, selectedVariant } = useProductContext();

  const handleFavorite = async () => {
    try {
      await createFavorite({
        productId: productId || "",
        name: data?.name || "",
        price: data?.price || 0,
        image: data?.image[0] || "",
      });
    } catch (error) {
      throw error;
    }
  };

  const handleAddCart = async () => {
    try {
      await createCartItem({
        productId: productId || "",
        name: data?.name || "",
        price: data?.price || 0,
        quantity: 1,
        color: selectedVariant?.color || "",
        image: data?.image[0] || "",
        size: selectedSize || 0,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography variant="h4" fontWeight={600}>
        {data?.name}
      </Typography>
      <Typography variant="body1" fontWeight={600} py={4}>
        {data?.price}$
      </Typography>
      <Select />
      <Box sx={{ mb: 4 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: "20px", height: "56px", mb: 2 }}
          onClick={handleAddCart}
        >
          <Typography variant="body1" fontWeight={600}>
            Add to Bag
          </Typography>
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ borderRadius: "20px", height: "56px" }}
          endIcon={<FavoriteBorderIcon />}
          onClick={handleFavorite}
        >
          <Typography variant="body1" fontWeight={600}>
            Favorite
          </Typography>
        </Button>
      </Box>
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
  );
}
