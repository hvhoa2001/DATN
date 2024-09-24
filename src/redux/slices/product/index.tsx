import { RTProductDetail, RTProducts } from "@datn/api/services/product-api";
import { DataWithStatus } from "../global";
import { createSlice } from "@reduxjs/toolkit";
import { getProductDetail, getProducts } from "./fetchFunction";

export type TProductData = {
  product: DataWithStatus<RTProducts>;
  productDetail: DataWithStatus<RTProductDetail>;
};

const initState: TProductData = {
  product: {
    status: "IDLE",
    data: [],
  },
  productDetail: {
    status: "IDLE",
    data: {} as RTProductDetail,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.product.status = "PROCESSING";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.product.status = "SUCCESS";
        state.product.data = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.product.status = "FAILED";
      })
      .addCase(getProductDetail.pending, (state) => {
        state.productDetail.status = "PROCESSING";
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetail.status = "SUCCESS";
        state.productDetail.data = action.payload;
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.productDetail.status = "FAILED";
      });
  },
});

export default productSlice.reducer;
