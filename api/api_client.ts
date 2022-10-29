import { CsvData } from '~/App';

const sheetId = '1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Winc Eindopdracht – Studenten Mock data – Frontend Cursus Opdrachten';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;

const fetchData = async () => {
  const response = await fetch(url);
  const rep = await response.text();
  const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
  const data: CsvData[] = [];
  jsonData.table.rows.forEach((item) => {
    data.push({
      name: item.c[0].v,
      assignment: item.c[1].v,
      difficulty: item.c[2].v,
      fun: item.c[3].v,
    });
  });
  return data;
};

export default fetchData;
