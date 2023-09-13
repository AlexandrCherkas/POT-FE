import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/angular-material.module';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AuthModule } from './modules/auth/auth.module';
import { ProgressSpinnerModule } from './modules/progress-spinner/progress-spinner.module';
import { HeaderComponent } from './core/components/header/header.component';
import { AdminService } from './modules/admin-portal/services/admin.service';
import { AppOverlayModule } from './modules/overlay/overlay.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TokenInterceptor } from './core/interceptors/token.interceptor';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSlideToggleModule,

    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatDialogModule,

    AuthModule,
    ProgressSpinnerModule,
    AppOverlayModule
  ],
  providers: [
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor ,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
