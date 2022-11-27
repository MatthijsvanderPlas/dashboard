import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataSliceProps } from '~/utils/types';
import fetchGoogleSheetData from './fetchData';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetchGoogleSheetData();
  return response;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {} as dataSliceProps,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.students = action.payload.studentsObject;
        state.assignments = action.payload.assignments;
        state.entities = action.payload.entities;
        state.status = 'idle';
      });
  },
});

export default dataSlice.reducer;
