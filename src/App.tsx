//docs.google.com/spreadsheets/d/1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks/edit?usp=sharing
import { useEffect, useState } from 'react';

interface CsvData {
  name: string;
  assignment: string;
  difficulty: number;
  fun: number;
}

function App() {
  const [parsedCsvData, setParsedCsvData] = useState<CsvData[]>([]);

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
        dataArray = jsonData.table.rows.map((item) => {
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

  return (
    <ul>
      {parsedCsvData.map((item, index) => (
        <li key={index}>
          {item.name} {item.assignment} {item.difficulty} {item.fun}
        </li>
      ))}
    </ul>
  );
}

export default App;
