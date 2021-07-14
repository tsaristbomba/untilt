import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, signUp } from "../userController";

const slice = createSlice({
  name: "user",
  initialState: {
    users: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.users = null;
      state.loading = false;
    },
    clearUserAlert: (state) => {
      state.success = null;
      state.error = null;
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
      state.error = "Failed loading users.";
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = "Account created.";
    },
    [signUp.pending]: (state) => {
      state.loading = true;
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Failed creating account.";
    },
  },
});

export default slice.reducer;

export const { clearUsers, clearUserAlert } = slice.actions;
