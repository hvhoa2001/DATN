import { RTUserProfile } from "@datn/api/services";
import { DataWithStatus } from "../global";
import { createSlice } from "@reduxjs/toolkit";

export type TCommonData = {
  userProfile: DataWithStatus<RTUserProfile>;
};

const initState: TCommonData = {
  userProfile: {
    status: "IDLE",
    data: {} as RTUserProfile,
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase;
  },
});

export default commonSlice.reducer;
