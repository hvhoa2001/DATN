import {
  RTCartItems,
  RTCheckoutNFT,
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
  getCheckout,
} from "./fetchFunction";

export type TCommonData = {
  userProfile: DataWithStatus<RTUserProfile>;
  userName: DataWithStatus<RTUserName>;
  favorite: DataWithStatus<RTFavorites>;
  reviews: DataWithStatus<RTReviewList>;
  cart: DataWithStatus<RTCartItems>;
  exportMode: boolean;
  checkout: DataWithStatus<RTCheckoutNFT>;
  checkoutSize: number;
  checkoutName: string;
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

  checkout: {
    status: "IDLE",
    data: {} as RTCheckoutNFT,
  },
  exportMode: false,
  checkoutSize: 0,
  checkoutName: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initState,
  reducers: {
    setCheckoutSize: (state, action) => {
      state.checkoutSize = action.payload;
    },
    setCheckoutName: (state, action) => {
      state.checkoutName = action.payload;
    },
  },
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
export const { setCheckoutSize, setCheckoutName } = commonSlice.actions;
