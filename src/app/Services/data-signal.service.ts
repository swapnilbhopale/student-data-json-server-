import { IStudent } from "src/app/Modal/students-data";
import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataSignalService {
  private data = signal<IStudent>;
  setData(studentData: IStudent) {
    // this.data.set(studentData);
  }
}
