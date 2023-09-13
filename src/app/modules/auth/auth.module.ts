import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginShellComponent } from './pages/login-shell/login-shell.component';
import { SharedModule } from '../shared/shared.module';


import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [
    LoginShellComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatDividerModule,
    AuthRoutingModule,
    MatSelectModule,
    FormsModule,
    MatSlideToggleModule,
    MatMenuModule,


    SharedModule
  ]
})
export class AuthModule { }
