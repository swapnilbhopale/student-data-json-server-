import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IStudent } from "src/app/Modal/students-data";
import { StudentDataService } from "src/app/Services/student-data.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],
})
export class StudentListComponent {
  studentsData: IStudent[] = [];
  constructor(
    private studentService: StudentDataService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.getStudendtData();
  }
  getStudendtData() {
    this.studentService.getStudentData().subscribe((res: IStudent[]) => {
      this.studentsData = res;
    });
  }
  editData(id: string) {
    this.router.navigateByUrl("edit-student/" + id);
  }
  removeStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe((res) => {
      if (res) {
        this.toaster.success("", "Student Deleted Successfully");
        Swal.fire({
          icon: "success",
          text: "Student Deleted Successfully",
          showCloseButton: true,
        });
        this.getStudendtData();
      }
    });
  }
}
