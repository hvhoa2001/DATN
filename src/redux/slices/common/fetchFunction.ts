import {
  featFavorites,
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
