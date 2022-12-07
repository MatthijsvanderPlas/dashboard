import { dataSliceProps } from '~/utils/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchGoogleSheetData from '../api/fetchData';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetchGoogleSheetData();
  return response;
});

const initialState: dataSliceProps = {
  students: {
    ById: {},
    AllIds: [],
  },
  assignments: {},
  entities: {
    ById: {},
    AllIds: [],
  },
  status: 'idle',
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.students = action.payload.students;
        state.assignments = action.payload.assignments;
        state.entities = action.payload.entities;
        state.status = 'idle';
      });
  },
});

export default dataSlice.reducer;
