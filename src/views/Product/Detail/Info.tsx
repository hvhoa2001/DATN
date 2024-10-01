import FreeDelivery from "@datn/common/Product/FreeDelivery";
import Reviews from "@datn/common/Product/Reviews";
import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createCartItem, createFavorite } from "@datn/api/services";
import useProductId from "@datn/hooks/useProductId";
import Select from "./select";
import { useProductContext } from "../context";

export default function Info() {
  const productId = useProductId();
  const { selectedSize, selectedVariant, productData } = useProductContext();

  const handleFavorite = async () => {
    try {
      await createFavorite({
        productId: productId || "",
        name: productData?.name || "",
        price: selectedVariant?.currentPrice || 0,
        image: selectedVariant?.preview || "",
        color: selectedVariant?.color || "",
        size: selectedSize || undefined,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleAddCart = async () => {
    try {
      await createCartItem({
        productId: productId || "",
        name: productData?.name || "",
        price: selectedVariant?.currentPrice || 0,
        quantity: 1,
        color: selectedVariant?.color || "",
        image: selectedVariant?.preview || "",
        size: selectedSize || 0,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography variant="h4" fontWeight={600}>
        {productData?.name}
      </Typography>
      <Typography variant="body1" fontWeight={600} py={4}>
        {selectedVariant?.currentPrice}$
      </Typography>
      <Select />
      <Box sx={{ mb: 4 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: "20px", height: "56px", mb: 2 }}
          onClick={handleAddCart}
          disabled={selectedVariant?.isSoldOut}
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
      <Typography variant="body1">{productData?.description}</Typography>
      <ul>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>Color Shown: {selectedVariant?.color}</Typography>
        </li>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>Style: {selectedVariant?.style}</Typography>
        </li>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>
            Country/Region of Origin: {selectedVariant?.madeIn}
          </Typography>
        </li>
      </ul>
      <Box sx={{ mb: 2 }}>
        <FreeDelivery />
      </Box>
      <Reviews />
    </Box>
  );
}
