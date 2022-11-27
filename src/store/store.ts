import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import filterReducer from './filterSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    filters: filterReducer,
  },
});

export default store;
// infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { }
export type AppDispatch = typeof store.dispatch;
