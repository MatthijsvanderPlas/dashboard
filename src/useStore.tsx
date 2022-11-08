import { useEffect, useState } from 'react';
import { CsvData } from './App';
import { getAveragePerAssignment, getUniqueArray } from './utils/Utils';

export type CsvKey = keyof CsvData;
export type Data = Partial<CsvData>;

const useStore = (allStudentData: CsvData[]) => {
  const [data, setData] = useState<Data[]>([]);

  const funArray = getAveragePerAssignment(allStudentData, 'fun');
  const difficultyArray = getAveragePerAssignment(allStudentData, 'difficulty');

  useEffect(() => {
    const assignmentArray = getUniqueArray(allStudentData, 'assignment');
    setData(
      assignmentArray.map((value, index) => {
        return { assignment: value, difficulty: difficultyArray[index], fun: funArray[index] };
      }),
    );
  }, []);

  return { data };
};

export default useStore;
