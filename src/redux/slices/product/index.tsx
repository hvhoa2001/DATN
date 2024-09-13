import { RTProducts } from "@datn/api/services/product-api";
import { DataWithStatus } from "../global";
import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./fetchFunction";

export type TProductData = {
  productDetails: DataWithStatus<RTProducts>;
};

const initState: TProductData = {
  productDetails: {
    status: "IDLE",
    data: [],
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.productDetails.status = "PROCESSING";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productDetails.status = "SUCCESS";
        state.productDetails.data = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.productDetails.status = "FAILED";
      });
  },
});

export default productSlice.reducer;
