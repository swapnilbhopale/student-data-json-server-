import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IStudent } from "src/app/Modal/students-data";
import { DataService } from "src/app/Services/data.service";
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
  showDialog = false;
  constructor(
    private studentService: StudentDataService,
    private dataService: DataService,
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
    // this.dialogContainer.clear();
    this.dialogRef = this.dialogContainer.createComponent(DialogComponent);
    this.dataService.sendData(student);

    this.dialogRef.instance.close.subscribe(() => {
      this.closeDialog();
    });

    this.showDialog = true;
  }

  closeDialog() {
    this.dialogRef.destroy();
    this.showDialog = false;
  }
}
