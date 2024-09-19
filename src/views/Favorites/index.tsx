import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { getUserFavorite } from "@datn/redux/slices/common/fetchFunction";
import { Box, Button, Container, Grid2, IconButton } from "@mui/material";
import { useEffect } from "react";
import FavoriteItem from "./FavoriteItem";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { deleteFavorite } from "@datn/api/services";

export default function FavoritesPage() {
  const { data, status } = useCommonDataSelector().favorite;
  const dispatch = useAppDispatch();

  const handleDelete = async (productId: string) => {
    try {
      await deleteFavorite(productId);
      dispatch(getUserFavorite());
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    dispatch(getUserFavorite());
  }, [dispatch]);

  return (
    <Box component={"section"}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100svh",
        }}
      >
        {status == "SUCCESS" && (
          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            {data?.map((item, index) => {
              return (
                <Grid2
                  size={{ xs: 12, sm: 4 }}
                  key={index}
                  sx={{ position: "relative" }}
                >
                  <Link
                    to={`/products/${item.productId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <FavoriteItem
                      image={item?.image}
                      name={item?.name}
                      price={item?.price}
                    />
                  </Link>

                  <Button
                    variant="outlined"
                    sx={{ borderRadius: "20px", mt: 3 }}
                  >
                    Add to Bag
                  </Button>
                  <Box>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "8px",
                        right: "24px",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        "&:hover": {
                          opacity: 1,
                        },
                        "&.MuiIconButton-root:hover": {
                          opacity: 1,
                        },
                      }}
                      onClick={() => {
                        handleDelete(item.productId);
                      }}
                    >
                      <FavoriteIcon
                        sx={{ color: "#000000", fontSize: "24px" }}
                      />
                    </IconButton>
                  </Box>
                </Grid2>
              );
            })}
          </Grid2>
        )}
      </Container>
    </Box>
  );
}
