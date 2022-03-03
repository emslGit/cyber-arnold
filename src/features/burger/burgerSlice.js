import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    open: (state) => {
      state.value = true;
    },
    close: (state) => {
      state.value = false;
    }
  },
})

export const { toggle, open, close } = burgerSlice.actions

export default burgerSlice.reducer