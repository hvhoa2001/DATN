import { fetchUserProfile } from "@datn/api/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProfile = createAsyncThunk(
  "common/user-profile",
  async (userId: string) => {
    const res = await fetchUserProfile(userId);
    return res;
  }
);
