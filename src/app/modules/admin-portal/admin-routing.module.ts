import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminShellComponent } from './pages/home-admin-shell/home-admin-shell.component';
import { EmployerComponent } from './components/employer/employer.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { AdministrationPageMenuComponent } from './components/employer/administration-page-menu/administration-page-menu.component';
import { ClaimInfoComponent } from './components/claims/claim-info/claim-info.component';
import { ManagePlansComponent } from './components/employer/manage-plans/manage-plans.component';
import { AddInsurancePlanComponent } from './components/employer/add-insurance-plan/add-insurance-plan.component';
import { EditPlanComponent } from './components/employer/edit-plan/edit-plan.component';
import { EditEmployerShellComponent } from './pages/edit-employer-shell/edit-employer-shell.component';
import { AddEmployerShellComponent } from './pages/add-employer-shell/add-employer-shell.component';
import { EmployeeTableShellComponent } from './pages/employee-table-shell/employee-table-shell.component';
import { AddEmployeeShellComponent } from './pages/add-employee-shell/add-employee-shell.component';
import { EditEmployeeShellComponent } from './pages/edit-employee-shell/edit-employee-shell.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminShellComponent,
    children: [
      { path: '', redirectTo: 'employers', pathMatch: 'full' },
      { path: 'employers', component: EmployerComponent },
      { path: 'claims', component: ClaimsComponent },
      { path: 'claims/:id', component: ClaimInfoComponent },
      {
        path: 'employers/employer/:id',
        component: AdministrationPageMenuComponent,
      },
      {
        path: 'employers/employer/:id/edit',
        component: EditEmployerShellComponent,
      },
      {
        path: 'employers/employer/:id/plans',
        component: ManagePlansComponent,
      },
      {
        path: 'employers/employer/:id/plans/add',
        component: AddInsurancePlanComponent,
      },
      {
        path: 'employers/employer/:id/plans/add/edit',
        component: EditPlanComponent,
      },
      {
        path: 'employers/employer/:id/plans/update/:_id',
        component: AddInsurancePlanComponent,
        data: { update: true },
      },
      {
        path: 'employers/employer/:id/plans/update/:_id/edit',
        component: EditPlanComponent,
      },
      {
        path: 'employers/employer/:id/employees',
        component: EmployeeTableShellComponent,
        children: [
          {
            path: '',
            redirectTo: 'add',
            pathMatch: 'full',
          },
          {
            path: 'add',
            component: AddEmployeeShellComponent,
          },
          {
            path: ':id/edit',
            component: EditEmployeeShellComponent,
          },
        ],
      },
      {
        path: 'employers/add',
        component: AddEmployerShellComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
