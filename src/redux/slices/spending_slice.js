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
      state.intermediarySpendingData = []
    },
    addSpendingEntry: (state, action) => {
      state.intermediarySpendingData.unshift(
        action.payload
      );
    },
    removeSpendingEntry: (state, action) => {
      const index = action.payload
      state.intermediarySpendingData.splice(index, 1)

    },
    assignSpendingCategory: (state,action) => {
      state.intermediarySpendingData[action.payload.index]["category"] = action.payload.category
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
