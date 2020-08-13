import { createSlice } from "@reduxjs/toolkit";

export const spendingSlice = createSlice({
  name: "spending",
  initialState: {
    databaseSpendingData: null,
    intermediarySpendingData: [],
  },
  reducers: {
    initializeSpendingData: (state, action) => {
      state.databaseSpendingData = action.payload;
    },
    addSpendingEntry: (state, action) => {
      state.intermediarySpendingData.unshift(
        action.payload
      );
    },
    removeSpendingEntry: (state, action) => {
      console.log("remove")
      const index = action.payload
      state.intermediarySpendingData.splice(index, 1)

    },
    assignSpendingCategory: (state,action) => {
      console.log(action.payload)
    },

    submitNewSpendingEntries: (state, action) => {
      console.log("submit")
    },
  },
});

export const {
  initializeSpendingData,
  addSpendingEntry,
  removeSpendingEntry,
  assignSpendingCategory,
} = spendingSlice.actions;

export const selectSpendingData = (state) =>
  state.spending.databaseSpendingData;

export const selectIntermediarySpendingData = (state) =>
  state.spending.intermediarySpendingData;

export default spendingSlice.reducer;
