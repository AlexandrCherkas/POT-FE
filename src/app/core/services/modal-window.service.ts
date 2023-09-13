import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPageComponent } from 'src/app/modules/shared/dialog-page/dialog-page.component';
import { AddUpdateEnrollmentComponent } from 'src/app/modules/employer-portal/components/add-update-enrollment/add-update-enrollment.component';
import { PlanInfoComponent } from 'src/app/modules/admin-portal/components/employer/plan-info/plan-info.component';
import { ReceiptInfoComponent } from 'src/app/modules/shared/components/receipt-info/receipt-info.component';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {

  constructor(public dialog: MatDialog) {}

  showPageDialog(message: string, addition?: string): any {
    const dialogRef = this.dialog.open(
      DialogPageComponent, {
        width: '450px',
        data:{
          message: message
        }
      })
    return dialogRef.afterClosed() ;
  }

  showInfoPageDialog(message: object): any {
    const dialogRef = this.dialog.open(
      PlanInfoComponent, {
        width: '450px',
        data:{
          message: message
        }
      })
    return dialogRef.afterClosed() ;
  }

  showEnrollmentPage(packages: any, consumerID: string, updatePackage?: any ): any {
    if(updatePackage){
      const dialogRef = this.dialog.open(
        AddUpdateEnrollmentComponent, {
          width: '450px',
          data: {
            package: updatePackage[0],
            consumerID: consumerID
          }
        })
        return dialogRef.afterClosed() ;
    } else {
      const dialogRef = this.dialog.open(
        AddUpdateEnrollmentComponent, {
          width: '450px',
          data: {
            packages: packages,
            consumerId: consumerID
          }
        })
      return dialogRef.afterClosed() ;
    }

  }

  showReceipt(url: string){
    const dialogRef = this.dialog.open(
      ReceiptInfoComponent, {
        width: '700px',
        data: url
      })
    return dialogRef.afterClosed() ;
  }


}
