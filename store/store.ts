import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './studentDataSlice';

const store = configureStore({
  reducer: dataSlice,
});

export default store;
