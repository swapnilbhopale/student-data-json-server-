import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentListComponent } from "./Components/student-list/student-list.component";
import { StudentFormComponent } from "./Components/student-form/student-form.component";
const routes: Routes = [
  { path: "", redirectTo: "student-form", pathMatch: "full" },
  {
    path: "student-list",
    component: StudentListComponent,
    title: "Students List",
  },
  { path: "student-form", component: StudentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
