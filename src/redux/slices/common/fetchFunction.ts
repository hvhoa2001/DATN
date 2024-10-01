import {
  featFavorites,
  fetchCartItems,
  fetchCartPrice,
  fetchReviewList,
  fetchUserName,
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
