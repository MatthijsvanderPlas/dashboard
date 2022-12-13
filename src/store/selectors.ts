import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';
import { StudentById, StudentData } from '~/utils/types';
export const selectStatus = (state: RootState) => state.data.status;

export const selectStudentsObject = (state: RootState) => state?.data?.students?.ById;

export const getEntity = (id: number) => {
  return (state: RootState) => state?.data?.entities?.ById?.[id];
};

export const selectAssignmentArray = (state: RootState) => state.data.assignments;

export const getEntities = (state: RootState) => state.data.entities.ById;

export const selectStudentFilter = (state: RootState) => state.filters.studentFilter;

export const selectAssignmentName = (id: number) => {
  return createSelector(selectAssignmentArray, (assignments) => {
    return Object.values(assignments)
      .filter((data) => data[1].id === id)
      .map((item) => item.assignment);
  });
};

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
    return students[id];
  });
};

export const selectAllStudents = createSelector(selectStudentsObject, (students) => {
  const studentsArray: number[] = Object.values(students).map((item) => item.id);
  return studentsArray;
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

export const selectStudentData = (id: number) => {
  return createSelector(selectStudentById(id), getEntities, (student, entities) => {
    const scoresArray: StudentData[] = Object.values(entities).filter((entity) => {
      if (entity.student === student.student) {
        return entity.score;
      }
      return;
    });
    return scoresArray;
  });
};
