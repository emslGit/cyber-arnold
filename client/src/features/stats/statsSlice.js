import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useState } from 'react'
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

export const resetStats = createAsyncThunk(
  'stats/resetStats',
  async () => await fetch('/api/stats', { method: 'DELETE' })
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
    }
  },
  extraReducers: {
    [resetStats.fulfilled]: (state) => {
      state.status = 'success';
      state.correctCount = 0;
      state.totalCount = 0;
      state.wordStats = {};
    },
    [getStats.fulfilled]: (state, action) => {
      state.status = 'success';
      (action.payload).forEach(o => state.wordStats[o.noun] = o.score);
    },
  }
})

export const { addCorrect, addIncorrect } = statsSlice.actions

export default statsSlice.reducer