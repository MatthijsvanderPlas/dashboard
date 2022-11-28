import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';
import { StudentById } from '~/utils/types';
export const selectStatus = (state: RootState) => state.data.status;

export const selectStudentsObject = (state: RootState) => state?.data?.students;

export const getEntity = (id: number) => {
  return (state: RootState) => state?.data?.entities?.[id];
};

export const getEntities = (state: RootState) => state.data.entities;

export const selectStudentFilter = (state: RootState) => state.filters.studentFilter;

export const selectStudentByName = (name: string) => {
  return createSelector(selectStudentsObject, (students) => {
    if (students) {
      const student: StudentById = Object.values(students).find((item) => item.student === name);
      return student as StudentById;
    }
  });
};

export const selectStudentById = (id: number) => {
  return createSelector(selectStudentsObject, (students) => {
    if (students) {
      const student = Object.values(students);
      return student[id];
    }
  });
};

export const selectAllStudents = createSelector(selectStudentsObject, (students) => {
  if (students) {
    const studentsArray: string[] = Object.values(students).map((item) => item.id);
    return studentsArray;
  }
  return;
});

export const filteredStudents = createSelector(
  // all students
  selectAllStudents,
  // filter
  selectStudentFilter,
  // output: filter out the students and retrieve filteredData
  (students, filter) => {
    return students?.filter((student: any) => !filter.includes(student));
  },
);
