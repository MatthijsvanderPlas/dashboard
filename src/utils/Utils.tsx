import { ScoreKey, Scores } from '~/utils/types';

export const getAveragePerAssignment = (array: Scores[], key: ScoreKey): number[] => {
  const group = array.map((studentScores) => {
    const filteredArray: number[] = Object.values(studentScores).filter((score) => score.a === key);
    console.log(filteredArray);
    return filteredArray.reduce((a: number, b: number) => a + b, 0) / filteredArray.length;
  });
  return group;
};

export const getUniqueArray = (array: Scores[], key: ScoreKey): string[] => {
  const uniqueArray = Array.from(new Set(array.map((item) => item?.[key] as string)));

  return uniqueArray;
};
