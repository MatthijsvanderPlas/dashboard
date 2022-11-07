import { useEffect, useState } from 'react';
import { CsvData } from './App';
import { getAveragePerAssignment } from './utils/Utils';

export type CsvKey = keyof CsvData;
export type Data = Partial<CsvData>;

const useStore = (allStudentData: CsvData[]) => {
  const [data, setData] = useState<Data[]>([]);
  const assignmentArray = Array.from(new Set(allStudentData.map((item) => item.assignment)));
  const funArray = getAveragePerAssignment(allStudentData, 'fun', assignmentArray);
  const difficultyArray = getAveragePerAssignment(allStudentData, 'difficulty', assignmentArray);

  useEffect(() => {
    setData(
      assignmentArray.map((v, i) => {
        return { assignment: v, difficulty: difficultyArray[i], fun: funArray[i] };
      }),
    );
  }, []);

  return { data };
};

export default useStore;
