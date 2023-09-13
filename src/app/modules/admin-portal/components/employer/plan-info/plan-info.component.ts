import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-info',
  templateUrl: './plan-info.component.html',
  styleUrls: ['./plan-info.component.scss']
})
export class PlanInfoComponent  {

  constructor(
    public dialogRef: MatDialogRef <PlanInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
