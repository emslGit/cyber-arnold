import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from '../features/burger/burgerSlice';
import statsReducer from '../features/stats/statsSlice';
import articlesReducer from '../features/articles/articlesSlice';

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    articles: articlesReducer,
    stats: statsReducer,
  },
});
