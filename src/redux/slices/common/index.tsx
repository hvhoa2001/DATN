import {
  RTAuctionData,
  RTCartItems,
  RTCheckoutNFT,
  RTFavorites,
  RTNFTData,
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
  getUserNFT,
  getUserNFTDetail,
  getAuctionList,
  getAuctionDetail,
  getUserListing,
} from "./fetchFunction";

export type TCommonData = {
  userProfile: DataWithStatus<RTUserProfile>;
  userName: DataWithStatus<RTUserName>;
  favorite: DataWithStatus<RTFavorites>;
  reviews: DataWithStatus<RTReviewList>;
  cart: DataWithStatus<RTCartItems>;
  exportMode: boolean;
  checkout: DataWithStatus<RTCheckoutNFT>;
  userNFT: DataWithStatus<RTNFTData[]>;
  userNFTDetail: DataWithStatus<RTNFTData>;
  auctionList: DataWithStatus<RTAuctionData[]>;
  auctionDetail: DataWithStatus<RTAuctionData>;
  userListing: DataWithStatus<RTAuctionData[]>;
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
  userNFT: {
    status: "IDLE",
    data: [],
  },
  userNFTDetail: {
    status: "IDLE",
    data: {} as RTNFTData,
  },
  auctionList: {
    status: "IDLE",
    data: [],
  },
  auctionDetail: {
    status: "IDLE",
    data: {} as RTAuctionData,
  },
  userListing: {
    status: "IDLE",
    data: [],
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
      })
      .addCase(getUserNFT.pending, (state) => {
        state.userNFT.status = "PROCESSING";
      })
      .addCase(getUserNFT.fulfilled, (state, action) => {
        state.userNFT.status = "SUCCESS";
        state.userNFT.data = action.payload;
      })
      .addCase(getUserNFT.rejected, (state) => {
        state.userNFT.status = "FAILED";
      })
      .addCase(getUserNFTDetail.pending, (state) => {
        state.userNFTDetail.status = "PROCESSING";
      })
      .addCase(getUserNFTDetail.fulfilled, (state, action) => {
        state.userNFTDetail.status = "SUCCESS";
        state.userNFTDetail.data = action.payload;
      })
      .addCase(getUserNFTDetail.rejected, (state) => {
        state.userNFTDetail.status = "FAILED";
      })
      .addCase(getAuctionList.pending, (state) => {
        state.auctionList.status = "PROCESSING";
      })
      .addCase(getAuctionList.fulfilled, (state, action) => {
        state.auctionList.status = "SUCCESS";
        state.auctionList.data = action.payload;
      })
      .addCase(getAuctionList.rejected, (state) => {
        state.auctionList.status = "FAILED";
      })
      .addCase(getAuctionDetail.pending, (state) => {
        state.auctionDetail.status = "PROCESSING";
      })
      .addCase(getAuctionDetail.fulfilled, (state, action) => {
        state.auctionDetail.status = "SUCCESS";
        state.auctionDetail.data = action.payload;
      })
      .addCase(getAuctionDetail.rejected, (state) => {
        state.auctionDetail.status = "FAILED";
      })
      .addCase(getUserListing.pending, (state) => {
        state.userListing.status = "PROCESSING";
      })
      .addCase(getUserListing.fulfilled, (state, action) => {
        state.userListing.status = "SUCCESS";
        state.userListing.data = action.payload;
      })
      .addCase(getUserListing.rejected, (state) => {
        state.userListing.status = "FAILED";
      });
  },
});

export default commonSlice.reducer;
export const { setCheckoutSize, setCheckoutName } = commonSlice.actions;
