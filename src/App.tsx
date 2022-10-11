//docs.google.com/spreadsheets/d/1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks/edit?usp=sharing
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
    let LabelsArray = Array.from(parsedCsvData, (item) => item.assignment);
    const LabelsSet = new Set(LabelsArray);
    LabelsArray = [...LabelsSet];
    setLabels([...LabelsArray]);

    const difficultyArray = [];

    for (let i = 0; i < LabelsArray.length; i++) {
      const number = parsedCsvData.filter((item) => item.assignment === LabelsArray[i]);
      difficultyArray.push(number.reduce((a, b) => a + b.difficulty, 0) / number.length);
    }
    setCsvDifficulty([...difficultyArray]);

    const funArray = [];

    for (let i = 0; i < LabelsArray.length; i++) {
      const number = parsedCsvData.filter((item) => item.assignment === LabelsArray[i]);
      funArray.push(number.reduce((a, b) => a + b.fun, 0) / number.length);
    }
    setCsvFun([...funArray]);
  }, [parsedCsvData]);

  return (
    <>
      <BarChart labels={labels} csvdifficulty={csvDifficulty} csvfun={csvFun} />
    </>
  );
}

export default App;
