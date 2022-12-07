import axios from 'axios';
import { IAssignmentObj, IEntities, IResponseData, IStudentData, StudentData } from '~/utils/types';

const BASE_URL = 'https://opensheet.elk.sh/1frzKuN9XlaZRPsFDlup4bHEIPv7AV6rSUSjOKw9moc0/1';

const fetchGoogleSheetData = async () => {
  const response = await axios(BASE_URL);

  const studentArray = Array.from(
    new Set(Object.values(response.data as IResponseData[]).map((entry) => entry.Student)),
  );

  const students: IStudentData = { ById: {}, AllIds: [] };
  studentArray.forEach((student) => {
    const id = studentArray.indexOf(student) + 1;
    students.ById[id] = { id: id, student: student, scores: [] };
    students.AllIds.push(id);
  });

  const assignmentArray = Array.from(
    new Set(Object.values(response.data as IResponseData[]).map((entry) => entry.Assignment)),
  );

  const assignments: IAssignmentObj = {};
  assignmentArray.map(
    (assignment) =>
      (assignments[assignmentArray.indexOf(assignment) + 1] = {
        id: assignmentArray.indexOf(assignment) + 1,
        assignment: assignment,
        scores: [],
      }),
  );

  const entities: IEntities<StudentData> = {
    ById: {},
    AllIds: [],
  };
  response.data.map((item: IResponseData) => {
    const id = response.data.indexOf(item) + 1;
    const studentId = Object.values(students.ById).filter(
      (student) => student.student === item.Student,
    )[0].id;
    const assignmentId = Object.values(assignments).filter(
      (assignmentItem) => assignmentItem.assignment === item.Assignment,
    )[0].id;
    entities.ById[id] = {
      id: id,
      student: item.Student,
      score: {
        assignment: item.Assignment,
        difficulty: Number(item.Difficulty),
        fun: Number(item.Fun),
      },
    };
    entities.AllIds.push(id);
    students.ById[studentId].scores.push(id);
    assignments[assignmentId].scores.push(id);
  });

  return { students, assignments, entities };
};

export default fetchGoogleSheetData;
