import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  correctWords: [],
  incorrectWords: [],
  incorrectWordStats: {},
  correctCount: 0,
  totalCount: 0,
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addCorrect: (state, action) => {
      if (!state.correctWords.includes(action.payload)) {
        state.correctWords.push(action.payload);
      }
      state.correctCount += 1;
      state.totalCount += 1;
    },
    addIncorrect: (state, action) => {
      if (!state.incorrectWords.includes(action.payload)) {
        state.incorrectWords.push(action.payload);
      }

      state.incorrectWordStats[action.payload.de] = (state.incorrectWordStats[action.payload.de] || 0) + 1;
      state.totalCount += 1;
    },
    resetIncorrect: (state) => {
      state.incorrectWords = [];
    },
    resetStats: (state) => {
      state.correctCount = 0;
      state.totalCount = 0;
      state.correctWords = [];
      state.incorrectWords = [];
    }
  },
})

export const { addCorrect, addIncorrect, resetIncorrect, resetStats } = statsSlice.actions

export default statsSlice.reducer