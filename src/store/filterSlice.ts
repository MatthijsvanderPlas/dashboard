import { createSlice } from '@reduxjs/toolkit';
type filterSlice = {
  studentFilter: string[];
  assignmentFilter: string[];
};

const initialState: filterSlice = {
  studentFilter: [],
  assignmentFilter: ['difficulty', 'fun'],
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
    toggleAssignment(state, action) {
      const indexOfPayload = state.assignmentFilter.indexOf(action.payload);
      if (indexOfPayload > -1) {
        state.assignmentFilter.splice(indexOfPayload, 1);
      } else {
        state.assignmentFilter.push(action.payload);
        state.assignmentFilter.sort();
      }
    },
  },
});

export const { toggleStudent, toggleAssignment } = filterSlice.actions;

export default filterSlice.reducer;
