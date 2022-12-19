export interface IResponseData {
  Student: string;
  Assignment: string;
  Difficulty: number;
  Fun: number;
}

export interface IStudent {
  [index: number]: {
    id: number;
    student: string;
    scores: number[];
  };
}

export interface IStudentData {
  ById: IStudent;
  AllIds: number[];
}

export interface IAssignmentObj {
  [index: number]: {
    id: number;
    assignment: string;
    scores: number[];
  };
}

export interface IEntities<T> {
  ById: { [id: number]: T };
  AllIds: number[];
}

export interface StudentData {
  id: number;
  student: string;
  score: { assignment: string; difficulty: number; fun: number };
}

export interface IScore {
  assignment: string;
  difficulty?: number;
  fun?: number;
}

export interface dataSliceProps {
  students: IStudentData;
  assignments: IAssignmentObj;
  entities: IEntities<StudentData>;
  status: string | null;
}

export interface StudentById {
  id: number;
  student: string;
}

export interface Student<T> {
  [index: number]: T;
}

export type Keys = 'difficulty' | 'fun';

export type DataProps = {
  assignment: string;
  difficulty: number;
  fun: number;
};

export type BarGroupProps = {
  data: IScore[];
  width: number;
  height: number;
  events?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export interface ILinkContext {
  clicked: boolean;
  setClicked: (c: boolean) => void;
}
