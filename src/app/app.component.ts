import { Component } from "@angular/core";
import { StudentDataService } from "./Services/student-data.service";
import { IStudent } from "./Modal/students-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "product-list";
  mydata: IStudent[] = [];
  constructor(private studentDataServ_: StudentDataService) {
    this.getData();
  }

  getData() {
    this.studentDataServ_.getStudentData().subscribe((res: IStudent[]) => {
      this.mydata = res;
      if (this.mydata) {
        console.log(this.mydata[0], "---------");
      }
    });
  }
}
