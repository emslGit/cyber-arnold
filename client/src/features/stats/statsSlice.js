import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  correctCount: 0,
  totalCount: 0,
}

export const getStats = createAsyncThunk(
  'stats/getStats',
  async () => await fetch('/api/stats', { method: 'GET' })
    .then(res => res.json())
)

export const resetStats = createAsyncThunk(
  'stats/resetStats',
  async () => await fetch('/api/stats', { method: 'DELETE' })
)

export const postStats = createAsyncThunk(
  'stats/postStats',
  async (word) => {
    await fetch('/api/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    })
  }
)

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addCorrect: (state) => {
      state.correctCount += 1;
      state.totalCount += 1;
    },
    addIncorrect: (state) => {
      state.totalCount += 1;
    }
  },
  extraReducers: {
    [resetStats.fulfilled]: (state) => {
      state.status = 'success';
      state.correctCount = 0;
      state.totalCount = 0;
    },
    [resetStats.rejected]: (state) => {
      state.status = 'failed';
    },
    [postStats.fulfilled]: (state) => {
      state.status = 'success';
    },
    [postStats.rejected]: (state) => {
      state.status = 'failed';
    },
    [getStats.fulfilled]: (state) => {
      state.status = 'success';
    },
    [getStats.rejected]: (state) => {
      state.status = 'failed';
    },
  }
})

export const { addCorrect, addIncorrect } = statsSlice.actions

export default statsSlice.reducer