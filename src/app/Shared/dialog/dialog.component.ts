import { DataService } from "./../../Services/data.service";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IStudent } from "src/app/Modal/students-data";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
  studentData!: IStudent;

  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((res) => {
      this.studentData = res;
      console.log(this.studentData, "datByService");
    });
  }

  @Output() close = new EventEmitter<void>();

  closeDialog() {
    this.close.emit();
  }
}
