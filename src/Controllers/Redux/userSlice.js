import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../userController";

const slice = createSlice({
  name: "user",
  initialState: {
    users: null,
    loading: false,
    msg: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.users = null;
      state.loading = false;
      state.msg = null;
    },
  },
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.rejected]: (state) => {
      state.loading = false;
      state.msg = "Failed loading users.";
    },
  },
});

export default slice.reducer;

export const { clearUsers } = slice.actions;
