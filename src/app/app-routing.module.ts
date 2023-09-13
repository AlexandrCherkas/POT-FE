import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginShellComponent } from './modules/auth/pages/login-shell/login-shell.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PermissionGuard } from './core/guards/permission.guard';
import { HeaderComponent } from './core/components/header/header.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginShellComponent,
  },
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        canActivate: [PermissionGuard],
        data: {
          role: 'admin',
        },
        loadChildren: () =>
          import('./modules/admin-portal/admin-portal.module').then(
            (module) => module.AdminPortalModule
          ),
      },
      {
        path: 'employer',
        canActivate: [PermissionGuard],
        data: {
          role: 'employer',
        },
        loadChildren: () =>
          import('./modules/employer-portal/employer-portal.module').then(
            (module) => module.EmployerPortalModule
          ),
      },
      {
        path: 'consumer',
        canActivate: [PermissionGuard],
        data: {
          role: 'consumer',
        },
        loadChildren: () =>
          import('./modules/consumer-portal/consumer-portal.module').then(
            (module) => module.ConsumerPortalModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
