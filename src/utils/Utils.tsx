import { CsvData, CsvKey } from '~/utils/types';

export const getAveragePerAssignment = (array: CsvData[], key: CsvKey): number[] => {
  const assignmentArray = getUniqueArray(array, 'assignment');
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

export const getUniqueArray = (array: Partial<CsvData[]>, key: CsvKey): string[] => {
  const uniqueArray = Array.from(new Set(array.map((item) => item?.[key] as string)));

  return uniqueArray;
};
