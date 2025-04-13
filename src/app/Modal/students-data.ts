export interface IMarks {
  physics: number;
  maths: number;
  english: number;
}

export interface IStudent {
  username: string;
  password: string;
  info: {
    id: number;
    class: string;
    name: string;
    gender: string;
    age: number;
    email: string;
    marks: IMarks;
    result: string;
  };
}
