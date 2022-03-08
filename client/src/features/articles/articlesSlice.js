import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { csvToJson, shuffleJSON } from '../../helpers/helpers'

const initialState = {
  words: [],
  word: {},
  prevWord: null,
  latestAns: null,
  total: 0,
}

// export const fetchWords = createAsyncThunk(
//   'words/fetchWords',
//   async () => await fetch('words.csv')
//     .then(res => res.text())
//     .then(csv => shuffleJSON(csvToJson(csv)))
// )¨

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async () => await fetch('/api')
    .then(res => res.json())
    .then(csv => shuffleJSON(csv))
)

export const ArticlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setWords: (state, action) => {
      state.words = action.payload;
    },
    nextWord: (state) => {
      state.prevWord = state.word;
      state.word = state.words.pop();
    },
    incTotal: (state) => {
      state.total += 1;
    },
    setLatestAns: (state, action) => {
      state.latestAns = action.payload;
    },
    resetArticles: (state) => {
      state.words = [];
      state.word = null;
      state.prevWord = null;
      state.latestAns = null;
      state.total = 0;
    }
  },
  extraReducers: {
    [fetchWords.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchWords.fulfilled]: (state, action) => {
      state.status = 'success';
      state.words = action.payload;
    },
    [fetchWords.rejected]: (state) => {
      state.status = 'failed';
    },
  }
})

export const { setWords, nextWord, incTotal, setLatestAns, resetArticles } = ArticlesSlice.actions

export default ArticlesSlice.reducer