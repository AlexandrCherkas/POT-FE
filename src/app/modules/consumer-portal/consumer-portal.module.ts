import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeConsumerShellComponent } from './pages/home-consumer-shell/home-consumer-shell.component';
import { ConsumerRoutingModule } from './consumer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { EnrollmentsComponent } from './pages/enrollments/enrollments.component';
import { ClaimsComponent } from './pages/claims/claims.component';
import { AddClaimComponent } from './components/add-claim/add-claim.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';
import { DndDirective } from './components/upload-receipt/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { UploadReceiptComponent } from './components/upload-receipt/upload-receipt.component';

@NgModule({
  declarations: [
    HomeConsumerShellComponent,
    HomeContentComponent,
    EnrollmentsComponent,
    ClaimsComponent,
    AddClaimComponent,
    DndDirective,
    ProgressComponent,
    UploadReceiptComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ConsumerRoutingModule,
    SharedModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    ProgressSpinnerModule
  ],
  exports: [HomeConsumerShellComponent],
})
export class ConsumerPortalModule { }
