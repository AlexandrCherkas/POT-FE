import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-receipt-info',
  templateUrl: './receipt-info.component.html',
  styleUrls: ['./receipt-info.component.scss']
})
export class ReceiptInfoComponent  {

  constructor(
    public dialogRef: MatDialogRef <ReceiptInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
