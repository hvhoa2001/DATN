import {
  checkoutNFT,
  featFavorites,
  fetchAuctionDetail,
  fetchAuctionList,
  fetchCartItems,
  fetchCartPrice,
  fetchCheckoutItems,
  fetchNFTDetail,
  fetchReviewList,
  fetchUserListing,
  fetchUserListingDetail,
  fetchUserName,
  fetchUserNFT,
  fetchUserProfile,
} from "@datn/api/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProfile = createAsyncThunk(
  "common/user-profile",
  async (userId: string) => {
    const res = await fetchUserProfile(userId);
    return res;
  }
);

export const getUsername = createAsyncThunk("common/user-name", async () => {
  const res = await fetchUserName();
  return res;
});

export const getUserFavorite = createAsyncThunk(
  "common/user-favorite",
  async () => {
    const res = await featFavorites();
    return res;
  }
);

export const getReviewList = createAsyncThunk(
  "common/review-list",
  async (productId: string) => {
    const res = await fetchReviewList(productId);
    return res;
  }
);

export const getCartItems = createAsyncThunk("common/cart-items", async () => {
  const res = await fetchCartItems();
  return res;
});

export const getCartPrice = createAsyncThunk("common/cart-price", async () => {
  const res = await fetchCartPrice();
  return res;
});

export const getCheckout = createAsyncThunk(
  "common/checkout",
  async ({ name, size }: { name: string; size: number }) => {
    const res = await checkoutNFT({
      name,
      size,
    });
    return res;
  }
);

export const getUserNFT = createAsyncThunk("common/user-nft", async () => {
  const res = await fetchUserNFT();
  return res;
});

export const getUserNFTDetail = createAsyncThunk(
  "common/user-nft-detail",
  async (tokenId: number) => {
    const res = await fetchNFTDetail(tokenId);
    return res;
  }
);

export const getAuctionList = createAsyncThunk(
  "common/auction-list",
  async () => {
    const res = await fetchAuctionList();
    return res;
  }
);

export const getAuctionDetail = createAsyncThunk(
  "common/auction-list-detail",
  async (auctionId: number) => {
    const res = await fetchAuctionDetail(auctionId);
    return res;
  }
);

export const getUserListing = createAsyncThunk(
  "common/user-listing",
  async () => {
    const res = await fetchUserListing();
    return res;
  }
);

export const getUserListingDetail = createAsyncThunk(
  "common/user-listing-detail",
  async (tokenId: number) => {
    const res = await fetchUserListingDetail(tokenId);
    return res;
  }
);
