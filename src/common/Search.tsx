import {
  Box,
  Button,
  Drawer,
  Grid2,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useProductSelector } from "@datn/redux/hook";
import { getProducts } from "@datn/redux/slices/product/fetchFunction";
import useDebounce from "@datn/hooks/useDebounce";
import ProductItem from "@datn/views/Product/ProductItem";
import { Link } from "react-router-dom";

export default function Search() {
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { data } = useProductSelector().product;
  const detailData = useMemo(() => {
    return data?.map((item) => ({
      productId: item.productId,
      preview: item.variants[0]?.preview,
      currentPrice: item.variants[0]?.currentPrice || 0,
      highlight: item.variants[0]?.highlight,
      price: item.variants[0]?.fullPrice || 0,
      sale: item.variants[0].saleRate || 0,
      gender: item.gender,
    }));
  }, [data]);

  const debounceSubmit = useDebounce(() => {
    dispatch(getProducts({ name: name }));
  }, 500);

  useEffect(() => {
    if (name) {
      debounceSubmit();
    }
  }, [name, debounceSubmit, name]);

  return (
    <Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Button
          onClick={toggleDrawer(true)}
          variant="text"
          startIcon={<SearchIcon />}
          sx={{
            border: "1px solid #D9D9D9",
            borderRadius: "24px",
            px: 2,
            minWidth: "144px",
          }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ display: { md: "none", xs: "block" } }}>
        <IconButton>
          <SearchIcon fontSize="large" />
        </IconButton>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="top">
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <TextField
                id="input-with-icon-textfield"
                sx={{
                  maxWidth: "158px",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <SearchIcon fontSize="large" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { px: 0, borderRadius: "24px" },
                  },
                }}
                size="small"
                placeholder="Search"
              />
            </Box>
            <Box sx={{ display: { md: "none", xs: "block" } }}>
              <IconButton>
                <SearchIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Grid2 container sx={{ width: "100%" }} spacing={2}>
          {data?.map((item) => {
            const subImages = item.variants.flatMap(
              (variant) => variant.preview
            );
            const detail = detailData?.find(
              (i) => i.productId === item.productId
            );
            return (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.productId}>
                <Link
                  to={`/products/${item.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductItem
                    id={item.productId}
                    name={item.name}
                    img={detail?.preview}
                    currentPrice={detail?.currentPrice || 0}
                    highlight={detail?.highlight}
                    numberColor={item.variants.length}
                    subImg={subImages}
                    price={detail?.price}
                    saleRate={detail?.sale}
                    gender={detail?.gender}
                  />
                </Link>
              </Grid2>
            );
          })}
        </Grid2>
      </Drawer>
    </Box>
  );
}
