import { CsvData } from '~/App';
import { CsvKey } from '~/useStore';

export const getAveragePerAssignment = (
  array: CsvData[],
  key: CsvKey,
  assignmentArray: string[],
): number[] => {
  const group = assignmentArray.map((item) => {
    const filteredOnAssignment: number[] = array
      .filter((entry) => entry.assignment === item)
      .map((entry) => entry[key] as number);

    return (
      filteredOnAssignment.reduce((a: number, b: number) => a + b, 0) / filteredOnAssignment.length
    );
  });
  return group;
};
