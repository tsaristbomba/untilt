import { createSlice } from "@reduxjs/toolkit";
import { loadUser, signIn } from "../userController";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: null,
    admin: false,
    loggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    signOut: (state) => {
      state.loggedIn = false;
      state.admin = false;
      localStorage.removeItem("token");
      state.token = null;
      state.error = null;
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.data.token);
      state.token = action.payload.data.token;
      state.user = action.payload.data.user;
      if (action.payload.data.user.role) state.admin = true;
      state.loggedIn = true;
      state.loading = false;
    },
    [signIn.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signIn.rejected]: (state) => {
      state.loggedIn = false;
      state.loading = false;
      state.error = "Invalid Credentials";
      state.user = null;
    },

    [loadUser.fulfilled]: (state, action) => {
      if (action.payload.data.role) state.admin = true;
      state.user = action.payload.data.name;
      state.loggedIn = true;
      state.loading = false;
    },
    [loadUser.pending]: (state) => {
      state.loading = true;
    },
    [loadUser.rejected]: (state) => {
      state.loggedIn = false;
      state.loading = false;
      // state.error = "Session expired";
    },
  },
});

export default slice.reducer;

export const { signOut } = slice.actions;
