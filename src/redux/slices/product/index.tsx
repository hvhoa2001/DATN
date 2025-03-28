import {
  RTDetailNFT,
  RTProductDetail,
  RTProductNFT,
  RTProducts,
  RTVariantDetail,
} from "@datn/api/services/product-api";
import { DataWithStatus } from "../global";
import { createSlice } from "@reduxjs/toolkit";

import {
  getNFTDetail,
  getProductDetail,
  getProducts,
  getProductsNFT,
  getVariantDetail,
} from "./fetchFunction";

export type TProductData = {
  product: DataWithStatus<RTProducts>;
  productDetail: DataWithStatus<RTProductDetail>;
  variantDetail: DataWithStatus<RTVariantDetail>;
  productNFT: DataWithStatus<RTProductNFT>;
  NFTDetail: DataWithStatus<RTDetailNFT>;
  size: number;
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
  variantDetail: {
    status: "IDLE",
    data: {} as RTVariantDetail,
  },
  productNFT: {
    status: "IDLE",
    data: [],
  },
  NFTDetail: {
    status: "IDLE",
    data: {} as RTDetailNFT,
  },
  size: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {
    selectSize(state, action) {
      state.size = action.payload;
    },
  },
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
      })
      .addCase(getVariantDetail.pending, (state) => {
        state.variantDetail.status = "PROCESSING";
      })
      .addCase(getVariantDetail.fulfilled, (state, action) => {
        state.variantDetail.status = "SUCCESS";
        state.variantDetail.data = action.payload;
      })
      .addCase(getVariantDetail.rejected, (state) => {
        state.variantDetail.status = "FAILED";
      })
      .addCase(getProductsNFT.pending, (state) => {
        state.productNFT.status = "PROCESSING";
      })
      .addCase(getProductsNFT.fulfilled, (state, action) => {
        state.productNFT.status = "SUCCESS";
        state.productNFT.data = action.payload;
      })
      .addCase(getProductsNFT.rejected, (state) => {
        state.productNFT.status = "FAILED";
      })
      .addCase(getNFTDetail.pending, (state) => {
        state.NFTDetail.status = "PROCESSING";
      })
      .addCase(getNFTDetail.fulfilled, (state, action) => {
        state.NFTDetail.status = "SUCCESS";
        state.NFTDetail.data = action.payload;
      })
      .addCase(getNFTDetail.rejected, (state) => {
        state.NFTDetail.status = "FAILED";
      });
  },
});

export default productSlice.reducer;
export const { selectSize } = productSlice.actions;
