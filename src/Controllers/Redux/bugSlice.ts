import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadBugs, createBug, deleteBug, editBug } from "../bugController";

// Types
type StateTypes = {
  loading: boolean;
  bugs: object | null;
  error: string | null;
  success: string | null;
  isFiltered: boolean;
};

const slice = createSlice({
  name: "bug",
  initialState: {
    loading: false,
    bugs: null,
    error: null,
    success: null,
    isFiltered: false,
  },
  reducers: {
    clearBugs: (state: StateTypes) => {
      state.bugs = null;
      state.loading = false;
      state.error = null;
    },
    clearBugsMsg: (state: StateTypes) => {
      state.error = null;
      state.success = null;
    },
    filter: (state: StateTypes) => {
      state.isFiltered = !state.isFiltered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadBugs.fulfilled,
        (state: StateTypes, action: PayloadAction<object>) => {
          state.bugs = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadBugs.pending, (state: StateTypes) => {
        state.loading = true;
        state.bugs = null;
      })
      .addCase(loadBugs.rejected, (state: StateTypes) => {
        state.loading = false;
        state.bugs = null;
      })
      .addCase(
        editBug.fulfilled,
        (state: StateTypes, action: PayloadAction<object>) => {
          state.bugs = action.payload;
          state.success = "Bug successfully Edited";
          state.loading = false;
        }
      )
      .addCase(editBug.pending, (state: StateTypes) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(editBug.rejected, (state: StateTypes) => {
        state.error = "Failed editing bug";
        state.loading = false;
      })
      .addCase(
        createBug.fulfilled,
        (state: StateTypes, action: PayloadAction<object>) => {
          state.bugs = action.payload;
          state.success = "Bug successfully created";
          state.loading = false;
        }
      )
      .addCase(createBug.pending, (state: StateTypes) => {
        state.error = null;
        state.success = null;
        state.loading = true;
      })
      .addCase(createBug.rejected, (state: StateTypes) => {
        state.error = "Bug name already exists";
        state.loading = false;
      })
      .addCase(
        deleteBug.fulfilled,
        (state: StateTypes, action: PayloadAction<object>) => {
          state.bugs = action.payload;
          state.success = "Successfully deleted bug";
          state.loading = false;
        }
      )
      .addCase(deleteBug.pending, (state: StateTypes) => {
        state.success = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteBug.rejected, (state: StateTypes) => {
        state.loading = false;
        state.error = "Failed deleting bug";
      });
  },
});

export default slice.reducer;

export const { clearBugs, filter, clearBugsMsg } = slice.actions;
