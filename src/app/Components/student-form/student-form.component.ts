import { StudentDataService } from "./../../Services/student-data.service";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IStudent } from "src/app/Modal/students-data";
import Swal from "sweetalert2";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.scss"],
})
export class StudentFormComponent {
  studentForm!: FormGroup;
  studentsData: IStudent[] = [];
  studentId!: string;
  isEdit: boolean = false;
  constructor(
    private studentService: StudentDataService,
    private toaster: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.intializeForm();
    this.getStudentId();
  }
  intializeForm(data?: IStudent) {
    this.studentForm = new FormGroup({
      id: new FormControl(data ? data.id : "", [Validators.required]),
      userName: new FormControl(data ? data.username : ""),
      password: new FormControl(data ? data.password : ""),
      info: new FormGroup({
        class: new FormControl(data ? data.info.class : ""),
        name: new FormControl(data ? data.info.name : ""),
        gender: new FormControl(data ? data.info.gender : "", [
          Validators.required,
        ]),
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
  resetForm() {
    const currentUrl = this.router.url;
    this.studentForm.reset();
    if (currentUrl.includes("edit")) {
      this.studentForm.patchValue({ id: this.studentId });
    }
  }
  submitData() {
    const studentData = this.studentForm.value;
    this.studentService.createStudent(studentData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: "success",
          text: "Student Created Successfully.",
          showCancelButton: true,
        });
        this.studentForm.reset();
      },
      error: (err: any) => alert("API Error"),
    });
  }

  getStudentId() {
    const currentUrl = this.router.url;
    if (currentUrl.includes("edit")) {
      this.activatedRoute.params.subscribe((res: any) => {
        this.studentId = res.id;
      });
      this.isEdit = true;
      this.getStudentById(this.studentId);
    }
  }

  getStudentById(id: string) {
    this.studentService.getStudentById(id).subscribe((res: IStudent) => {
      this.intializeForm(res);
      this.studentForm.get("id")?.disable();
    });
  }
  updateData() {
    this.studentForm.get("id")?.enable();
    const studentData = this.studentForm.value;

    this.studentService.updateStudent(studentData).subscribe({
      next: (res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            text: "Student Updated Successfully.",
            showCancelButton: true,
          });
          this.studentForm.reset();
          this.isEdit = false;
          history.pushState({}, "", "student-form");
        }
      },
      error: (err) => alert("API Error " + err),
    });
  }
}
