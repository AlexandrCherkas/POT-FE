import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeEmployerShellComponent } from './pages/home-employer-shell/home-employer-shell.component';
import { EmployeesComponent } from './pages/employees-shell/employees.component';
import { EnrollmentsShellComponent } from './pages/enrollments-shell/enrollments-shell.component';
import { ImportComponent } from './pages/import/import.component';
import { EditEmployerComponent } from './components/edit-employer/edit-employer.component';
import { AddEmployeeShellComponent } from './pages/add-employee-shell/add-employee-shell.component';
import { EditEmployeeShellComponent } from './pages/edit-employee-shell/edit-employee-shell.component';

const routes: Routes = [

  {
    path: '',    component: HomeEmployerShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: EditEmployerComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employees/add', component: AddEmployeeShellComponent},
      { path: 'employees/:id', component: EmployeesComponent },
      { path: 'employees/:id/enrollments', component: EnrollmentsShellComponent },
      { path: 'employees/:id/edit', component: EditEmployeeShellComponent},
      { path: 'import', component: ImportComponent },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}
