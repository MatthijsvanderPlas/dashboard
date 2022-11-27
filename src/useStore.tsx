import { useEffect, useState } from 'react';
import { CsvData, Data } from './utils/types';
import { getAveragePerAssignment, getUniqueArray } from './utils/Utils';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data };
};

export default useStore;
