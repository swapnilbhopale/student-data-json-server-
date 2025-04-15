import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IStudent } from "src/app/Modal/students-data";
import { StudentDataService } from "src/app/Services/student-data.service";
import { DialogComponent } from "src/app/Shared/dialog/dialog.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],
})
export class StudentListComponent {
  studentsData: IStudent[] = [];

  @ViewChild("dialogContainer", { read: ViewContainerRef })
  dialogContainer!: ViewContainerRef;
  dialogRef!: ComponentRef<DialogComponent>;
  showOverlay = false;
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

  openDialog(student: IStudent) {
    this.dialogContainer.clear();
    this.dialogRef = this.dialogContainer.createComponent(DialogComponent);

    // Set Inputs
    this.dialogRef.instance.id = student.id;
    this.dialogRef.instance.name = student.info.name;
    this.dialogRef.instance.class = student.info.class;
    this.dialogRef.instance.gender = student.info.gender;
    this.dialogRef.instance.age = student.info.age;
    this.dialogRef.instance.result = student.info.result;
    this.dialogRef.instance.maths = student.info.marks.maths;
    this.dialogRef.instance.physics = student.info.marks.physics;
    this.dialogRef.instance.english = student.info.marks.english;
    this.dialogRef.instance.email = student.info.email;
    this.dialogRef.instance.password = student.password;

    // Subscribe to close output
    this.dialogRef.instance.close.subscribe(() => {
      this.closeDialog();
    });

    this.showOverlay = true;
  }

  closeDialog() {
    this.dialogRef.destroy();
    this.showOverlay = false;
  }
}
