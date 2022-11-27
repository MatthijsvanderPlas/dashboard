import { Entities, Student, StudentById, StudentData } from '~/utils/types';

const sheetId = '1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Winc Eindopdracht – Studenten Mock data – Frontend Cursus Opdrachten';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;

const fetchGoogleSheetData = async () => {
  const response = await fetch(url);
  const rep = await response.text();
  const jsonData = await JSON.parse(rep.substring(47).slice(0, -2));
  const students: string[] = Array.from(
    new Set(jsonData.table.rows.map((item: { c: { v: string }[] }) => item.c[0].v as string)),
  );

  const studentsObject: Student<StudentById> = {};

  const assignments: string[] = Array.from(
    new Set(jsonData.table.rows.map((item: { c: { v: string }[] }) => item.c[1].v as string)),
  );

  const entities: Entities<StudentData> = {};

  students.map((student) => {
    const id = Number(Math.max(Object.values(entities).length, 0));
    studentsObject[id] = { id: id, student: student };
    const newstudent = {
      id: id,
      student: student as string,
      scores: [],
    };
    newstudent.scores = jsonData.table.rows
      .filter((item: { c: { v: any }[] }) => String(item.c[0].v) === student)
      .map((item: { c: { v: any }[] }) => {
        return { a: item.c[1].v, d: item.c[2].v, f: item.c[3].v };
      });

    return (entities[id] = newstudent);
  });

  return { studentsObject, assignments, entities };
};

export default fetchGoogleSheetData;
