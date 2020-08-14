import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null
  },
  reducers: {
    signIn: (state, action) => {
      state.userData = action.payload
    },
    signOut: state => {
        state.userData = null
    }
  }
})

export const { signIn, signOut } = userSlice.actions;

export const selectUser = state => state.user.userData;

export const selectUserId = state => state.user.userData;

export default userSlice.reducer;