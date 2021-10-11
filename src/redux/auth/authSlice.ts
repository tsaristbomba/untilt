import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUser, signIn } from "../user/userThunk";

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
    signOut: (state: AuthStateTypes) => {
      state.loggedIn = false;
      state.admin = false;
      localStorage.removeItem("token");
      state.token = null;
      state.error = null;
      state.loading = false;
      state.user = null;
    },
    clearAuthAlert: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signIn.fulfilled,
        (state: AuthStateTypes, action: PayloadAction<LogPayload>) => {
          localStorage.setItem("token", action.payload.data.token);
          state.token = action.payload.data.token;
          state.user = action.payload.data.user;
          // if (action.payload.data.user.role) state.admin = true;
          state.loggedIn = true;
          state.loading = false;
        }
      )
      .addCase(signIn.pending, (state: AuthStateTypes) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state: AuthStateTypes) => {
        state.loggedIn = false;
        state.loading = false;
        state.error = "Invalid Credentials";
        state.user = null;
      })
      .addCase(
        loadUser.fulfilled,
        (state: AuthStateTypes, action: PayloadAction<LoadPayload>) => {
          //    if (action.payload.data.role) state.admin = true;
          state.user = action.payload.data.name;
          state.loggedIn = true;
          state.loading = false;
        }
      )
      .addCase(loadUser.pending, (state: AuthStateTypes) => {
        state.loading = true;
      })
      .addCase(loadUser.rejected, (state: AuthStateTypes) => {
        state.loggedIn = false;
        state.loading = false;
        // state.error = "Session expired";
      });
  },
});

export default slice.reducer;

export const { signOut, clearAuthAlert } = slice.actions;
