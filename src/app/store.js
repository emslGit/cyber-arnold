import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from '../features/burger/burgerSlice';

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
  },
});
