import {
  featProductDetail,
  featProducts,
} from "@datn/api/services/product-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("products/products", async () => {
  const res = await featProducts();
  return res;
});

export const getProductDetail = createAsyncThunk(
  "products/product-detail",
  async (productId: string) => {
    const res = await featProductDetail(productId);
    return res;
  }
);
