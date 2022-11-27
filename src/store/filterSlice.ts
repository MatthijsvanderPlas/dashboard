import { createSlice } from '@reduxjs/toolkit';
type filterSlice = {
  studentFilter: string[];
};

const initialState: filterSlice = {
  studentFilter: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleStudent(state, action) {
      const indexOfPayload = state.studentFilter.indexOf(action.payload);
      if (indexOfPayload > -1) {
        state.studentFilter.splice(indexOfPayload, 1);
      } else {
        state.studentFilter.push(action.payload);
      }
    },
  },
});

export const { toggleStudent } = filterSlice.actions;

export default filterSlice.reducer;
