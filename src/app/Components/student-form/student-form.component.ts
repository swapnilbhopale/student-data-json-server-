import { StudentDataService } from "./../../Services/student-data.service";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IStudent } from "src/app/Modal/students-data";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.scss"],
})
export class StudentFormComponent {
  studentForm!: FormGroup;
  studentsData: IStudent[] = [];
  studentId!: string;
  constructor(
    private studentService: StudentDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.intializeForm();
    this.getId();
  }
  intializeForm(data?: IStudent) {
    this.studentForm = new FormGroup({
      id: new FormControl(data ? data.id : ""),
      userName: new FormControl(data ? data.username : ""),
      password: new FormControl(data ? data.password : ""),
      info: new FormGroup({
        class: new FormControl(data ? data.info.class : ""),
        name: new FormControl(data ? data.info.name : ""),
        gender: new FormControl(data ? data.info.gender : ""),
        age: new FormControl(data ? data.info.age : ""),
        email: new FormControl(data ? data.info.email : ""),
        marks: new FormGroup({
          physics: new FormControl(data ? data.info.marks.physics : ""),
          maths: new FormControl(data ? data.info.marks.maths : ""),
          english: new FormControl(data ? data.info.marks.english : ""),
        }),
        result: new FormControl(data ? data.info.result : "", [
          Validators.required,
        ]),
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

  getId() {
    // let studentIdd = 0;
    const currentUrl = this.router.url;
    // if (currentUrl.includes("edit")) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.studentId = res.id;
    });
    this.getStudentById(this.studentId);
    // }
  }

  getStudentById(id: string) {
    this.studentService.getStudentById(id).subscribe((res: IStudent) => {
      // this.studentForm = res;
      console.log(res);
      this.intializeForm(res);
    });
  }
}
