import { IScore, StudentData } from './types';

export const getStudentAvgPerAssignment = (data: StudentData[]) => {
  // Need an array of all the assignment so I can use that to create a new IScore Array for the average scores.
  // Secondly will need a result array as interface IScore[] with all the averages
  const assignments: string[] = [];
  const result: IScore[] = [];
  data.forEach((item) => {
    if (!assignments.includes(item.score.assignment)) {
      assignments.push(item.score.assignment);
    }
  });
  // For every assignment create the object with difficulty,fun averages
  assignments.forEach((element) => {
    const filteredOnAssignment = data.filter((item) => item.score.assignment === element);
    const averageDifficulty =
      filteredOnAssignment.reduce((acc, cur) => acc + cur.score.difficulty, 0) /
      filteredOnAssignment.length;
    const averageFun =
      filteredOnAssignment.reduce((acc, cur) => acc + cur.score.fun, 0) /
      filteredOnAssignment.length;

    result.push({ assignment: element, difficulty: averageDifficulty, fun: averageFun });
  });

  return result;
};
