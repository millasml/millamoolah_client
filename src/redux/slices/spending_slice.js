import { createSlice } from '@reduxjs/toolkit'

export const spendingSlice = createSlice({
  name: 'spending',
  initialState: {
    databaseSpendingData: null,
    addToDatabase: [],
    removeFromDatabase: [],
  },
  reducers: {
    initializeSpendingData : (state, action) => {
        state.databaseSpendingData = action.payload
    },
    addSpendingEntry: (state, action) => {
      state.addToDatabase = [...state.addToDatabase].push(action.payload)
    },
    removeSpendingEntry: (state, action) => {
        state.removeFromDatabase = [...state.removeFromDatabase].push(action.payload)
    } 
  }
})

export const { initializeSpendingData, addSpendingEntry, removeSpendingEntry } = spendingSlice.actions;

export const selectSpendingData = state => state.spending.databaseSpendingData;

export default spendingSlice.reducer;