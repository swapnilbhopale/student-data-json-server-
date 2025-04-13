import { Component } from "@angular/core";
import { IStudent } from "src/app/Modal/students-data";
import { StudentDataService } from "src/app/Services/student-data.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],
})
export class StudentListComponent {
  studentsData: IStudent[] = [];
  constructor(private studentService: StudentDataService) {
    this.getStudendtData();
  }
  getStudendtData() {
    this.studentService.getStudentData().subscribe((res: IStudent[]) => {
      this.studentsData = res;
    });
  }
}
