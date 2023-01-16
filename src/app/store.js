import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
});
