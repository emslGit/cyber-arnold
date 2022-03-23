import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  correctCount: 0,
  totalCount: 0,
}

export const resetStats = createAsyncThunk(
  'stats/resetStats',
  async () => await axios.delete('/api/stats')
)

export const postStats = createAsyncThunk(
  'stats/postStats',
  async (word) => await axios.post('/api/stats', { de: word.de })
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
    [resetStats.pending]: (state) => {
      state.status = 'loading';
    },
    [resetStats.fulfilled]: (state) => {
      state.status = 'success';
      state.correctCount = 0;
      state.totalCount = 0;
    },
    [resetStats.rejected]: (state) => {
      state.status = 'failed';
    },
    [postStats.pending]: (state) => {
      state.status = 'loading';
    },
    [postStats.fulfilled]: (state) => {
      state.status = 'success';
    },
    [postStats.rejected]: (state) => {
      state.status = 'failed';
    },
  }
})

export const { addCorrect, addIncorrect } = statsSlice.actions

export default statsSlice.reducer