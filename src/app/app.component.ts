import { Component } from "@angular/core";
import { StudentDataService } from "./Services/student-data.service";
import { IStudent } from "./Modal/students-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Student-Portal";
}
