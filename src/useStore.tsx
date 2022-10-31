import { useEffect, useState } from 'react';
import { CsvData } from './App';

const useStore = (data: CsvData[], student?: string | undefined) => {
  const [parsedCsvData, setParsedCsvData] = useState<CsvData[]>([]);
  const [labels, setLabels] = useState<(string | string[])[]>([]);
  const [csvDifficulty, setCsvDifficulty] = useState<number[]>([]);
  const [csvFun, setCsvFun] = useState<number[]>([]);
  const [slice, setSlice] = useState<number[]>([0, 10]);
  const [total] = useState<number>(56);

  useEffect(() => {
    if (!student) {
      setParsedCsvData(data);
    }
    if (student) {
      setParsedCsvData(data.filter((item) => item.name === student));
    }
  }, [data, student]);

  useEffect(() => {
    let LabelsArray: string[] = Array.from(parsedCsvData, (item) => item.assignment);
    const LabelsSet: Set<string> = new Set(LabelsArray);
    LabelsArray = [...LabelsSet];
    const splitLabelsArray = LabelsArray.map((label) =>
      label.includes(' ') ? label.replaceAll('- ', '').split(' ') : label,
    );
    setLabels([...splitLabelsArray.slice(...slice)]);

    const difficultyArray: number[] = [];

    for (let i = 0; i < LabelsArray.length; i++) {
      const number = parsedCsvData.filter((item) => item.assignment === LabelsArray[i]);
      difficultyArray.push(number.reduce((a, b) => a + b.difficulty, 0) / number.length) as number;
    }
    setCsvDifficulty([...difficultyArray.slice(...slice)]);

    const funArray: number[] = [];

    for (let i = 0; i < LabelsArray.length; i++) {
      const number = parsedCsvData.filter((item) => item.assignment === LabelsArray[i]);
      funArray.push(number.reduce((a, b) => a + b.fun, 0) / number.length) as number;
    }
    setCsvFun([...funArray.slice(...slice)]);
  }, [parsedCsvData, slice]);

  const nextSlice = () => {
    if (slice[1] >= total) return;
    setSlice((prev) => [prev[1], prev[1] + 10]);
  };

  const prevSlice = () => {
    if (slice[0] === 0) return;
    setSlice((prev) => [prev[0] - 10, prev[0]]);
  };

  return { labels, csvDifficulty, csvFun, nextSlice, prevSlice };
};

export default useStore;
