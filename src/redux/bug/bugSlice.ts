import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadBugs, createBug, deleteBug, editBug } from "./bugThunk";

const slice = createSlice({
  name: "bug",
  initialState: {
    loading: false,
    bugs: [],
    error: null,
    success: null,
    isFiltered: false,
    myBugs: [],
    filteredArray: [],
  },
  reducers: {
    clearBugs: (state: BugStateTypes) => {
      state.bugs = [];
      state.myBugs = [];
      state.filteredArray = [];
      state.loading = false;
      state.error = null;
    },
    clearBugsMsg: (state: BugStateTypes) => {
      state.error = null;
      state.success = null;
    },
    filter: (state: BugStateTypes) => {
      state.isFiltered = !state.isFiltered;
    },
    setMyBugs: (state: BugStateTypes, action: PayloadAction<object>) => {
      state.myBugs = action.payload;
    },
    setFilteredArray: (state: BugStateTypes, action: PayloadAction<object>) => {
      state.filteredArray = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadBugs.fulfilled,
        (state: BugStateTypes, action: PayloadAction<object>) => {
          state.bugs = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadBugs.pending, (state: BugStateTypes) => {
        state.loading = true;
        state.bugs = [];
      })
      .addCase(loadBugs.rejected, (state: BugStateTypes) => {
        state.loading = false;
        state.bugs = [];
      })
      .addCase(
        editBug.fulfilled,
        (state: BugStateTypes, action: PayloadAction<object>) => {
          state.bugs = action.payload;
          state.success = "Bug successfully Edited";
          state.loading = false;
        }
      )
      .addCase(editBug.pending, (state: BugStateTypes) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(editBug.rejected, (state: BugStateTypes) => {
        state.error = "Failed editing bug";
        state.loading = false;
      })
      .addCase(
        createBug.fulfilled,
        (state: BugStateTypes, action: PayloadAction<object>) => {
          state.bugs = action.payload;
          state.success = "Bug successfully created";
          state.loading = false;
        }
      )
      .addCase(createBug.pending, (state: BugStateTypes) => {
        state.error = null;
        state.success = null;
        state.loading = true;
      })
      .addCase(createBug.rejected, (state: BugStateTypes) => {
        state.error = "Bug name already exists";
        state.loading = false;
      })
      .addCase(
        deleteBug.fulfilled,
        (state: BugStateTypes, action: PayloadAction<object>) => {
          state.bugs = action.payload;
          state.success = "Successfully deleted bug";
          state.loading = false;
        }
      )
      .addCase(deleteBug.pending, (state: BugStateTypes) => {
        state.success = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteBug.rejected, (state: BugStateTypes) => {
        state.loading = false;
        state.error = "Failed deleting bug";
      });
  },
});

export default slice.reducer;

export const { clearBugs, filter, clearBugsMsg, setMyBugs, setFilteredArray } =
  slice.actions;
