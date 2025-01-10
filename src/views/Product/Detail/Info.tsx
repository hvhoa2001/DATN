import FreeDelivery from "@datn/common/Product/FreeDelivery";
import Reviews from "@datn/common/Product/Reviews";
import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createCartItem, createFavorite } from "@datn/api/services";
import Select from "./select";
import { formatNumber } from "@datn/utils/format";
import { useProductSelector } from "@datn/redux/hook";
import { toast } from "react-toastify";

export default function Info() {
  const { NFTDetail, size } = useProductSelector();

  const handleFavorite = async () => {
    try {
      await createFavorite({
        productId: NFTDetail.data?.productId || "",
        name: NFTDetail.data?.name || "",
        price: NFTDetail.data?.price || 0,
        image: NFTDetail.data?.image || "",
        // size: 0,
      });
      toast.success("Add favorite success!");
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const handleAddCart = async () => {
    try {
      await createCartItem({
        productId: NFTDetail.data?.productId || "",
        price: NFTDetail.data?.price || 0,
        name: NFTDetail.data?.name || "",
        quantity: 1,
        image: NFTDetail.data?.image || "",
        size: size,
      });
      toast.success("Add cart success!");
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography variant="h4" fontWeight={600}>
        {NFTDetail.data?.name}
      </Typography>
      <Typography variant="body1" fontWeight={600} py={4}>
        {formatNumber(1000)} USDT
      </Typography>
      <Select />
      <Box sx={{ mb: 4 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: "20px", height: "56px", mb: 2 }}
          onClick={handleAddCart}
          // disabled={selectedVariant?.isSoldOut}
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
      <Typography variant="body1">{NFTDetail.data?.description}</Typography>
      <ul>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>Color Shown: </Typography>
        </li>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>Style: </Typography>
        </li>
        <li style={{ paddingBottom: "8px" }}>
          <Typography>Country/Region of Origin: Vietnam</Typography>
        </li>
      </ul>
      <Box sx={{ mb: 2 }}>
        <FreeDelivery />
      </Box>
      <Reviews />
    </Box>
  );
}
