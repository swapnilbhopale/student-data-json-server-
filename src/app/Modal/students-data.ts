export interface IMarks {
  physics: number;
  maths: number;
  english: number;
}

export interface IStudent {
  id: string;
  username: string;
  password: string;
  info: {
    class: string;
    name: string;
    gender: string;
    age: number;
    email: string;
    marks: IMarks;
    result: string;
  };
}
