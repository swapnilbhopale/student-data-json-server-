import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IStudent } from "../Modal/students-data";

@Injectable({
  providedIn: "root",
})
export class StudentDataService {
  private base_Url = "http://localhost:3000/data/";
  constructor(private http: HttpClient) {}

  getStudentData(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.base_Url);
  }
  createStudent(data: IStudent) {
    return this.http.post(this.base_Url, data);
  }
  getStudentById(id: string): Observable<IStudent> {
    return this.http.get<IStudent>(this.base_Url + id);
  }
}
