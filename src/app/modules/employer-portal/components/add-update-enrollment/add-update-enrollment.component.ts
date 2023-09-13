import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { DialogPageComponent } from 'src/app/modules/shared/dialog-page/dialog-page.component';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-add-update-enrollment',
  templateUrl: './add-update-enrollment.component.html',
  styleUrls: ['./add-update-enrollment.component.scss']
})
export class AddUpdateEnrollmentComponent  {
  public errorInsufficientBalance ="error-insufficient-balance";

  public enrollmentFormGroup: FormGroup;
  public plans = [];
  public selectPlan: object;
  public consumerID: string;
  public currentPackage;
  public increaseValue: number;
  private isUpdate: boolean = false
  private componentActive: boolean = true;
  public minElection:number


  constructor(
    private fb: FormBuilder,
    private modalWindow: ModalWindowService,
    private employerService: EmployerService,
    public dialogRef: MatDialogRef <DialogPageComponent>,

    @Inject(MAT_DIALOG_DATA)
      public data: any
    ) {
      this.enrollmentFormGroup = this.fb.group({
        name: ['', Validators.required],
        election: [''],
        contribution: [{ value: '', disabled: true }]
      });


      if(data.package){
        this.isUpdate = true;
        this.enrollmentFormGroup.controls['election'].setValidators(
          [Validators.min(data.package.election),Validators.required])
        this.currentPackage = data.package;
        this.consumerID = data.consumerID;
        this.plans.push(this.currentPackage)
        this.enrollmentFormGroup.patchValue(this.currentPackage)
        this.enrollmentFormGroup.get('name').setValue(this.currentPackage)
        this.increaseValue = Math.round(this.currentPackage.contribution / this.currentPackage.election)

        this.enrollmentFormGroup.get("election").valueChanges
        .pipe(
           debounceTime(1000))
        .subscribe(election => {
          if(election > this.currentPackage.election){
            let newElection = Math.round(election * this.increaseValue)
            this.enrollmentFormGroup.get("contribution").setValue(newElection)
          }
        })
      } else{
        this.enrollmentFormGroup.controls['election'].setValidators([Validators.min(1), Validators.required])
        this.consumerID = data.consumerId
        data.packages.forEach(plan => {
          if(plan.isActive){ this.plans.push(plan)}
        });
      }
    }

  onConfirmClick(): void {
    this.currentPackage = undefined;
    this.dialogRef.close(true);
  }

  public enableInput(): void{
    this.currentPackage = this.enrollmentFormGroup.get('name').value;
    this.enrollmentFormGroup.get('contribution').setValue(this.currentPackage.contribution)
  }

  public submit(): void{
    this.enrollmentFormGroup.markAllAsTouched();
    console.log(this.enrollmentFormGroup)
    if(this.enrollmentFormGroup.valid){
      this.currentPackage.election = this.enrollmentFormGroup.get('election').value;

      if(this.isUpdate){
        this.employerService.updatePackage(this.currentPackage._id, this.currentPackage.election, this.consumerID)
          .pipe(takeWhile(() => this.componentActive))
          .subscribe(data => {
            if(!data.status){
              this.modalWindow.showPageDialog(this.errorInsufficientBalance)
            }
            if(data.status){
              this.dialogRef.close(true);
              this.modalWindow.showPageDialog(`You updated package: ${data.package[0].name}`);
              this.employerService.setChangeTableEnrollment(true)
            }

          })
      } else {

        this.employerService.addPackageToConsumer(this.consumerID, this.currentPackage)
        .pipe(takeWhile(() => this.componentActive))
        .subscribe(data => {
          if(!data.status){
            this.modalWindow.showPageDialog(this.errorInsufficientBalance)
          }
          if(data.status){
            this.dialogRef.close(true);
            this.modalWindow.showPageDialog(data.message);
            this.employerService.setChangeTableEnrollment(true)
          }
        })
      }

    }
  }

}



