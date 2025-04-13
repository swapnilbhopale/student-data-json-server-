import { StudentDataService } from "./../../Services/student-data.service";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IStudent } from "src/app/Modal/students-data";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.scss"],
})
export class StudentFormComponent {
  studentForm!: FormGroup;
  studentsData: IStudent[] = [];
  constructor(private studentService: StudentDataService) {
    this.intializeForm();
  }
  intializeForm() {
    this.studentForm = new FormGroup({
      userName: new FormControl(""),
      password: new FormControl(""),
      info: new FormGroup({
        id: new FormControl(0),
        class: new FormControl(""),
        name: new FormControl(""),
        gender: new FormControl(""),
        age: new FormControl(""),
        email: new FormControl(""),
        marks: new FormGroup({
          physics: new FormControl(""),
          maths: new FormControl(""),
          english: new FormControl(""),
        }),
        result: new FormControl("", [Validators.required]),
      }),
    });
  }
  resertForm() {
    this.studentForm.reset();
    // this.intializeForm();
  }
  submitData() {
    const studentData = this.studentForm.value;
    this.studentService.createStudent(studentData).subscribe({
      next: (res) => alert("Student Created Successfully."),
      error: (err: any) => alert("API Error"),
    });
  }
}
