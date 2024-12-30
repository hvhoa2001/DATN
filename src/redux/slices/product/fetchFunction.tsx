import {
  featProductDetail,
  featProducts,
  featVariantDetail,
} from "@datn/api/services/product-api";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/products",
  async ({ name, category }: { name?: string; category?: string }) => {
    const res = await featProducts({ name, category });
    return res;
  }
);

export const getProductDetail = createAsyncThunk(
  "products/product-detail",
  async (productId: string) => {
    const res = await featProductDetail(productId);
    return res;
  }
);

export const getVariantDetail = createAsyncThunk(
  "products/variant-detail",
  async ({
    variantId,
    productId,
  }: {
    variantId: string;
    productId: string;
  }) => {
    const res = await featVariantDetail({ variantId, productId });
    return res;
  }
);
