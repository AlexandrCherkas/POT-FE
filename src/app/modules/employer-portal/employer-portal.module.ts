import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEmployerShellComponent } from './pages/home-employer-shell/home-employer-shell.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeesComponent } from './pages/employees-shell/employees.component';
import { SearchEmployeesComponent } from './components/search-employees/search-employees.component';
import { TableEmployeesComponent } from './components/table-employees/table-employees.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EnrollmentsShellComponent } from './pages/enrollments-shell/enrollments-shell.component';
import { AddUpdateEnrollmentComponent } from './components/add-update-enrollment/add-update-enrollment.component';
import { ImportComponent } from './pages/import/import.component';
import { EditEmployerComponent } from './components/edit-employer/edit-employer.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddEmployeeShellComponent } from './pages/add-employee-shell/add-employee-shell.component';
import { EditEmployeeShellComponent } from './pages/edit-employee-shell/edit-employee-shell.component';
@NgModule({
  declarations: [
    HomeEmployerShellComponent,
    EmployeesComponent,
    SearchEmployeesComponent,
    TableEmployeesComponent,
    EnrollmentsShellComponent,
    AddUpdateEnrollmentComponent,
    ImportComponent,
    EditEmployerComponent,
    AddEmployeeComponent,
    AddEmployeeShellComponent,
    EditEmployeeShellComponent,
  ],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    EmployerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    ProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  exports: [HomeEmployerShellComponent ]
})
export class EmployerPortalModule { }
