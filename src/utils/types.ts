export interface StudentData {
  id: number;
  student: string;
  scores: {
    a: string;
    d: number;
    f: number;
  }[];
}

export interface Entities<T> {
  [index: number]: T;
}

export interface dataSliceProps {
  students: Student<StudentById>;
  assignments: string[];
  entities: Entities<StudentData>;
  status: string | null;
}

export interface CsvData {
  name: string;
  assignment: string;
  difficulty: number;
  fun: number;
}

export interface StudentById {
  id: number;
  student: string;
}

export interface Student<T> {
  [index: number]: T;
}

export type CsvKey = keyof CsvData;

export type Data = Partial<CsvData>;

export type Keys = 'difficulty' | 'fun';

export type DataProps = {
  assignment: string;
  difficulty: number;
  fun: number;
};

export type BarGroupProps = {
  data: DataProps[];
  width: number;
  height: number;
  events?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export type MyParams = {
  id: string;
};
