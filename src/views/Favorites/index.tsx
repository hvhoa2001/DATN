import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { getUserFavorite } from "@datn/redux/slices/common/fetchFunction";
import { Box, Button, Container, Grid2 } from "@mui/material";
import { useEffect } from "react";
import FavoriteItem from "./FavoriteItem";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { data, status } = useCommonDataSelector().favorite;
  const dispatch = useAppDispatch();

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
                <Grid2 size={{ xs: 12, sm: 4 }} key={index}>
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
                </Grid2>
              );
            })}
          </Grid2>
        )}
      </Container>
    </Box>
  );
}
