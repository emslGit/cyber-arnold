import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { shuffleJSON } from '../../helpers/helpers'

const initialState = {
  wordStats: {},
  correctCount: 0,
  totalCount: 0,
}

export const getStats = createAsyncThunk(
  'stats/getStats',
  async () => await fetch('/api/stats', { method: 'GET' })
    .then(res => res.json())
    .then(csv => shuffleJSON(csv))
)

export const postStats = createAsyncThunk(
  'stats/postStats',
  async (stats) => await fetch('/api/stats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      wordStats: stats['wordStats'],
      correctCount: stats['correctCount'],
      totalCount: stats['totalCount']
    })
  })
)

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addCorrect: (state, action) => {
      state.wordStats[action.payload.de] = (state.wordStats[action.payload.de] || 0) + 1;
      state.correctCount += 1;
      state.totalCount += 1;
    },
    addIncorrect: (state, action) => {
      state.wordStats[action.payload.de] = (state.wordStats[action.payload.de] || 0) - 1;
      state.totalCount += 1;
    },
    resetStats: (state) => {
      state.correctCount = 0;
      state.totalCount = 0;
      state.wordStats = {};
      
      postStats({});
    }
  },
})

export const { addCorrect, addIncorrect, resetStats } = statsSlice.actions

export default statsSlice.reducer