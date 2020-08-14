import { createSlice } from "@reduxjs/toolkit";

export const savingsSlice = createSlice({
  name: "savings",
  initialState: {
    databaseSavingsData: null,
    intermediarySavingsData: [],
  },
  reducers: {
    initializeSavingsData: (state, action) => {
      state.databaseSavingsData = action.payload;
      state.intermediarySavingsData = []
    },
    addSavingsEntry: (state, action) => {
      state.intermediarySavingsData.unshift(
        action.payload
      );
    },
    removeSavingsEntry: (state, action) => {
      const index = action.payload
      state.intermediarySavingsData.splice(index, 1)

    },
    assignSavingsCategory: (state,action) => {
      state.intermediarySavingsData[action.payload.index]["category"] = action.payload.category
    },
  },
});

export const {
  initializeSavingsData,
  addSavingsEntry,
  removeSavingsEntry,
  assignSavingsCategory,
} = savingsSlice.actions;

export const selectSavingsData = (state) =>
  state.savings.databaseSavingsData;

export const selectIntermediarySavingsData = (state) =>
  state.savings.intermediarySavingsData;

export default savingsSlice.reducer;
