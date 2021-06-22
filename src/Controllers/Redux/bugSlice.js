import { createSlice } from "@reduxjs/toolkit";
import { loadBugs, createBug, deleteBug, editBug } from "../bugController";

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
    clearBugs: (state) => {
      state.bugs = null;
      state.loading = false;
      state.error = null;
    },
    clearBugsMsg: (state) => {
      state.error = null;
      state.success = null;
    },
    filter: (state) => {
      state.isFiltered = !state.isFiltered;
    },
  },
  extraReducers: {
    [loadBugs.fulfilled]: (state, action) => {
      state.bugs = action.payload;
      state.loading = false;
    },
    [loadBugs.pending]: (state) => {
      state.loading = true;
      state.bugs = null;
    },
    [loadBugs.rejected]: (state) => {
      state.loading = false;
      state.bugs = null;
    },
    [editBug.fulfilled]: (state, action) => {
      state.bugs = action.payload;
      state.success = "Bug successfully Edited";
      state.loading = false;
    },
    [editBug.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [editBug.rejected]: (state) => {
      state.error = "Failed editing bug";
      state.loading = false;
    },
    [createBug.fulfilled]: (state, action) => {
      state.bugs = action.payload;
      state.success = "Bug successfully created";
      state.loading = false;
    },
    [createBug.pending]: (state) => {
      state.error = null;
      state.success = null;
      state.loading = true;
    },
    [createBug.rejected]: (state) => {
      state.error = "Bug name already exists";
      state.loading = false;
    },
    [deleteBug.fulfilled]: (state, action) => {
      state.bugs = action.payload;
      state.success = "Successfully deleted bug";
      state.loading = false;
    },
    [deleteBug.pending]: (state) => {
      state.success = null;
      state.error = null;
      state.loading = true;
    },
    [deleteBug.rejected]: (state) => {
      state.loading = false;
      state.error = "Failed deleting bug";
    },
  },
});

export default slice.reducer;

export const { clearBugs, filter, clearBugsMsg } = slice.actions;
