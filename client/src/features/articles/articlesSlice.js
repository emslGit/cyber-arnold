import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { shuffleJSON } from '../../helpers/helpers'
import axios from 'axios'

const initialState = {
  words: [],
  word: {},
  prevWord: null,
  latestAns: null,
  total: 0,
}

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async () => await axios.get('/api/articles').then(res => shuffleJSON(res.data))
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
    setLatestAns: (state, action) => {
      state.latestAns = action.payload;
    },
    resetArticles: (state) => {
      state.words = [];
      state.word = null;
      state.prevWord = null;
      state.latestAns = null;
    }
  },
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.status = 'loading';
    },
    [getArticles.fulfilled]: (state, action) => {
      state.status = 'success';
      state.words = action.payload;
      state.word = state.words.pop();
    },
    [getArticles.rejected]: (state) => {
      state.status = 'failed';
    },
  }
})

export const { setWords, nextWord, setLatestAns, resetArticles } = ArticlesSlice.actions

export default ArticlesSlice.reducer