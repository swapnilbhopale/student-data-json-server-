import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IStudent } from "../Modal/students-data";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private data = new Subject<IStudent>();
  constructor() {}

  sendData(data: IStudent) {
    return this.data.next(data);
  }

  getData(): Observable<IStudent> {
    return this.data;
  }
}
