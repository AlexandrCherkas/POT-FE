import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';

import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from "@ngx-translate/core";

import { DialogPageComponent } from './dialog-page/dialog-page.component';

import { FormatDataPipe } from './pipes/formatData.pipe';
import { FormatCurrencyPipe } from './pipes/formatCurrency.pipe';
import { ClaimStatusPipe } from './pipes/claimStatus.pipe';
import { ChangeEmptyValuePipe } from './pipes/changeEmptyValue.pipe';
import { StatusPlanPipe } from './pipes/statusPlan.pipe';
import { CurrencySign } from './pipes/addCurrencySign.pipe';
import { FormatSSNPipe } from './pipes/formatSSN.pipe';
import { ReceiptInfoComponent } from './components/receipt-info/receipt-info.component';

@NgModule({
  declarations: [
    LogoComponent,
    DialogPageComponent,
    FormatDataPipe,
    FormatCurrencyPipe,
    ClaimStatusPipe,
    ChangeEmptyValuePipe,
    StatusPlanPipe,
    CurrencySign,
    FormatSSNPipe,
    ReceiptInfoComponent

  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatButtonModule,

    MatProgressSpinnerModule,
  ],
  exports:[
    LogoComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRadioModule,

    FormatDataPipe,
    FormatCurrencyPipe,
    ClaimStatusPipe,
    ChangeEmptyValuePipe,
    StatusPlanPipe,
    CurrencySign,
    FormatSSNPipe

  ]
})
export class SharedModule { }
