import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginShellComponent } from './pages/login-shell/login-shell.component';

const routes: Routes = [{ path: 'login', component: LoginShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
