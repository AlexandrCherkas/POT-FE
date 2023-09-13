import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HomeAdminShellComponent } from './pages/home-admin-shell/home-admin-shell.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployerComponent } from './components/employer/employer.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { EmployerAdministrationComponent } from './components/employer-administration/employer-administration.component';

import { AddNewEmployerComponent } from './components/employer/add-new-employer/add-new-employer.component';
import { SearchEmployersComponent } from './components/employer/search-employers/search-employers.component';
import { SearchClaimComponent } from './components/claims/search-claim/search-claim.component';
import { EmployersTableComponent } from './components/employer/employers-table/employers-table.component';
import { ClaimsTableComponent } from './components/claims/claims-table/claims-table.component';
import { AdministrationPageMenuComponent } from './components/employer/administration-page-menu/administration-page-menu.component';
import { AddEmployeeComponent } from './components/employer/add-employee/add-employee.component';
import { ClaimInfoComponent } from './components/claims/claim-info/claim-info.component';
import { ManagePlansComponent } from './components/employer/manage-plans/manage-plans.component';
import { AddInsurancePlanComponent } from './components/employer/add-insurance-plan/add-insurance-plan.component';
import { EditPlanComponent } from './components/employer/edit-plan/edit-plan.component';
import { AddEmployerShellComponent } from './pages/add-employer-shell/add-employer-shell.component';
import { EditEmployerShellComponent } from './pages/edit-employer-shell/edit-employer-shell.component';
import { AddEmployeeShellComponent } from './pages/add-employee-shell/add-employee-shell.component';
import { EmployeeTableShellComponent } from './pages/employee-table-shell/employee-table-shell.component';
import { EmployeesTableComponent } from './components/employer/employees-table/employees-table.component';
import { PlanInfoComponent } from './components/employer/plan-info/plan-info.component';
import { EditEmployeeShellComponent } from './pages/edit-employee-shell/edit-employee-shell.component';

@NgModule({
  declarations: [
    HomeAdminShellComponent,
    EmployerComponent,
    ClaimsComponent,
    AddNewEmployerComponent,
    SearchEmployersComponent,
    AdministrationPageMenuComponent,
    EmployersTableComponent,
    SearchClaimComponent,
    ClaimsTableComponent,
    AddEmployeeComponent,
    ClaimInfoComponent,
    ManagePlansComponent,
    AddInsurancePlanComponent,
    EditPlanComponent,
    EditEmployerShellComponent,
    AddEmployerShellComponent,
    AddEmployeeShellComponent,
    EmployeeTableShellComponent,
    EmployeesTableComponent,
    PlanInfoComponent,
    EditEmployeeShellComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,

    AdminRoutingModule,
    SharedModule,
    ProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [HomeAdminShellComponent],
})
export class AdminPortalModule {}
