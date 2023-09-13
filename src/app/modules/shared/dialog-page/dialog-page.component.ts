import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent  {



  constructor(
    public dialogRef: MatDialogRef <DialogPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
