import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUser, signIn } from "../userController";

// Types
type StateTypes = {
  loggedIn?: boolean;
  admin?: boolean;
  token?: string | null;
  error?: string | null;
  loading?: boolean;
  user?: string | null;
  name?: string;
  reducer?: any;
  actions?: any;
};

type LogPayload = {
  data: {
    token: string;
    user: string;
  };
};

type LoadPayload = {
  data: {
    name: string;
  };
};

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
    signOut: (state: StateTypes) => {
      state.loggedIn = false;
      state.admin = false;
      localStorage.removeItem("token");
      state.token = null;
      state.error = null;
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signIn.fulfilled,
        (state: StateTypes, action: PayloadAction<LogPayload>) => {
          localStorage.setItem("token", action.payload.data.token);
          state.token = action.payload.data.token;
          state.user = action.payload.data.user;
          // if (action.payload.data.user.role) state.admin = true;
          state.loggedIn = true;
          state.loading = false;
        }
      )
      .addCase(signIn.pending, (state: StateTypes) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state: StateTypes) => {
        state.loggedIn = false;
        state.loading = false;
        state.error = "Invalid Credentials";
        state.user = null;
      })
      .addCase(
        loadUser.fulfilled,
        (state: StateTypes, action: PayloadAction<LoadPayload>) => {
          //    if (action.payload.data.role) state.admin = true;
          state.user = action.payload.data.name;
          state.loggedIn = true;
          state.loading = false;
        }
      )
      .addCase(loadUser.pending, (state: StateTypes) => {
        state.loading = true;
      })
      .addCase(loadUser.rejected, (state: StateTypes) => {
        state.loggedIn = false;
        state.loading = false;
        // state.error = "Session expired";
      });
  },
});

export default slice.reducer;

export const { signOut } = slice.actions;
