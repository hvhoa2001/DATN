import { RTUserName, RTUserProfile } from "@datn/api/services";
import { DataWithStatus } from "../global";
import { createSlice } from "@reduxjs/toolkit";
import { getUsername, getUserProfile } from "./fetchFunction";

export type TCommonData = {
  userProfile: DataWithStatus<RTUserProfile>;
  userName: DataWithStatus<RTUserName>;
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
      });
  },
});

export default commonSlice.reducer;
