import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers, signUp } from "./userThunk";

const slice = createSlice({
  name: "user",
  initialState: {
    users: { data: [] },
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.users = { data: [] };
      state.loading = false;
    },
    clearUserAlert: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllUsers.fulfilled,
        (state: StateTypes, action: PayloadAction<object>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(getAllUsers.pending, (state: StateTypes) => {
        state.loading = true;
      })
      .addCase(getAllUsers.rejected, (state: StateTypes) => {
        state.loading = false;
        state.error = "Failed loading users.";
      })
      .addCase(
        signUp.fulfilled,
        (state: StateTypes, action: PayloadAction<object>) => {
          state.loading = false;
          state.success = "Account created.";
        }
      )
      .addCase(signUp.pending, (state: StateTypes) => {
        state.loading = true;
      })
      .addCase(signUp.rejected, (state: StateTypes) => {
        state.loading = false;
        state.error = "Failed creating account.";
      });
  },
});

export default slice.reducer;

export const { clearUsers, clearUserAlert } = slice.actions;
