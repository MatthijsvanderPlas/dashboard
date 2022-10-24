import { useEffect, useState } from 'react';
import { BarChart } from './components/BarChart';

interface CsvData {
  name: string;
  assignment: string;
  difficulty: number;
  fun: number;
}

function App() {
  const [parsedCsvData, setParsedCsvData] = useState<CsvData[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [csvDifficulty, setCsvDifficulty] = useState<number[]>([]);
  const [csvFun, setCsvFun] = useState<number[]>([]);
  const [slice, setSlice] = useState<number[]>([0, 10]);
  const [total] = useState<number>(56);

  const sheetId = '1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks';
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = 'Winc Eindopdracht – Studenten Mock data – Frontend Cursus Opdrachten';
  const query = encodeURIComponent('Select *');
  const url = `${base}&sheet=${sheetName}&tq=${query}`;

  useEffect(() => {
    let dataArray: CsvData[] = [];
    fetch(url)
      .then((res) => res.text())
      .then((rep) => {
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        dataArray = jsonData.table.rows.map((item: { c: { v: any }[] }) => {
          return {
            name: item.c[0].v,
            assignment: item.c[1].v,
            difficulty: item.c[2].v,
            fun: item.c[3].v,
          };
        });
        setParsedCsvData(dataArray);
      });
  }, [url]);

  useEffect(() => {
    let LabelsArray: string[] = Array.from(parsedCsvData, (item) => item.assignment);
    const LabelsSet: Set<string> = new Set(LabelsArray);
    LabelsArray = [...LabelsSet];
    setLabels([...LabelsArray.slice(...slice)]);

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

  return (
    <div className='mx-auto max-w-5xl my-8'>
      <BarChart labels={labels} csvdifficulty={csvDifficulty} csvfun={csvFun} />
      <button
        className='mx-4 px-5 mt-8 border-purple-300 border-2 rounded active:scale-90 shadow-gray-500 shadow-md'
        onClick={prevSlice}
      >
        Previous Slice
      </button>
      <button
        className='mx-4 px-5 border-sky-300 border-2 rounded active:scale-90 shadow-gray-500 shadow-md'
        onClick={nextSlice}
      >
        Next Slice
      </button>
    </div>
  );
}

export default App;
