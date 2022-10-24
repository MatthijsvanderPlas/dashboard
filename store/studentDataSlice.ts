import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchData from 'api/api_client';

export interface CsvData {
  name: string;
  assignment: string;
  difficulty: number;
  fun: number;
}

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchStudentData = createAsyncThunk('studentdata/fetchStudentData', async () => {
  const response = await fetchData();
  return response;
});

export const dataSlice = createSlice({
  name: 'studentdata',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchStudentData.pending, (state, action) => {
        state.status = 'loading';
      });
  },
});

export const selectData = (state) => state.data;

export default dataSlice.reducer;
