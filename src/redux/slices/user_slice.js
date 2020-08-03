import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
  },
  reducers: {
    signIn: (state, action) => {
      console.log("yay redux")
      console.log(action.payload)
      state.name = action.payload
    },
    signOut: state => {
        state.name = null
    }
  }
})

export const { signIn, signOut } = userSlice.actions;

export const selectUser = state => state.user.name;

export default userSlice.reducer;