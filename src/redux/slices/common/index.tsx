import {
  RTCartItems,
  RTCartPrice,
  RTFavorites,
  RTReviewList,
  RTUserName,
  RTUserProfile,
} from "@datn/api/services";
import { DataWithStatus } from "../global";
import { createSlice } from "@reduxjs/toolkit";
import {
  getUsername,
  getUserProfile,
  getUserFavorite,
  getReviewList,
  getCartItems,
  getCartPrice,
  getCheckout,
} from "./fetchFunction";

export type TCommonData = {
  userProfile: DataWithStatus<RTUserProfile>;
  userName: DataWithStatus<RTUserName>;
  favorite: DataWithStatus<RTFavorites>;
  reviews: DataWithStatus<RTReviewList>;
  cart: DataWithStatus<RTCartItems>;
  exportMode: boolean;
  price: DataWithStatus<RTCartPrice>;
  checkout: DataWithStatus<RTCartItems>;
};

const initState: TCommonData = {
  userProfile: {
    status: "IDLE",
    data: {} as RTUserProfile,
  },
  userName: {
    status: "IDLE",
    data: {} as RTUserName,
  },
  favorite: {
    status: "IDLE",
    data: {} as RTFavorites,
  },
  reviews: {
    status: "IDLE",
    data: {} as RTReviewList,
  },
  cart: {
    status: "IDLE",
    data: [],
  },
  price: {
    status: "IDLE",
    data: {} as RTCartPrice,
  },
  checkout: {
    status: "IDLE",
    data: [],
  },
  exportMode: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.userProfile.status = "PROCESSING";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile.status = "SUCCESS";
        state.userProfile.data = action.payload;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.userProfile.status = "FAILED";
      })
      .addCase(getUsername.pending, (state) => {
        state.userName.status = "PROCESSING";
      })
      .addCase(getUsername.fulfilled, (state, action) => {
        state.userName.status = "SUCCESS";
        state.userName.data = action.payload;
      })
      .addCase(getUsername.rejected, (state) => {
        state.userName.status = "FAILED";
      })
      .addCase(getUserFavorite.pending, (state) => {
        state.favorite.status = "PROCESSING";
      })
      .addCase(getUserFavorite.fulfilled, (state, action) => {
        state.favorite.status = "SUCCESS";
        state.favorite.data = action.payload;
      })
      .addCase(getUserFavorite.rejected, (state) => {
        state.favorite.status = "FAILED";
      })
      .addCase(getReviewList.pending, (state) => {
        state.reviews.status = "PROCESSING";
      })
      .addCase(getReviewList.fulfilled, (state, action) => {
        state.reviews.status = "SUCCESS";
        state.reviews.data = action.payload;
      })
      .addCase(getReviewList.rejected, (state) => {
        state.reviews.status = "FAILED";
      })
      .addCase(getCartItems.pending, (state) => {
        state.cart.status = "PROCESSING";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart.status = "SUCCESS";
        state.cart.data = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.cart.status = "FAILED";
      })
      .addCase(getCartPrice.pending, (state) => {
        state.price.status = "PROCESSING";
      })
      .addCase(getCartPrice.fulfilled, (state, action) => {
        state.price.status = "SUCCESS";
        state.price.data = action.payload;
      })
      .addCase(getCartPrice.rejected, (state) => {
        state.price.status = "FAILED";
      })
      .addCase(getCheckout.pending, (state) => {
        state.checkout.status = "PROCESSING";
      })
      .addCase(getCheckout.fulfilled, (state, action) => {
        state.checkout.status = "SUCCESS";
        state.checkout.data = action.payload;
      })
      .addCase(getCheckout.rejected, (state) => {
        state.checkout.status = "FAILED";
      });
  },
});

export default commonSlice.reducer;
