
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IConsumerPackage } from 'src/app/modules/employer-portal/interfaces/consumerPackage';
import { IEmployerPermissions } from 'src/app/modules/employer-portal/interfaces/employerPermissions';
import { UsersService } from 'src/app/modules/shared/services/users.service';
import { IConsumerPermissions } from '../../interfaces/consumerPermissions';
import { ConsumerServiceService } from '../../services/consumer-service.service';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.scss']
})
export class AddClaimComponent implements OnInit {

  public errorReceipt: string = "no-receipt-error";
  public errorPermissions: string = 'claim-permissions-error';
  public errorAvailableAmount: string = "The limit on insurance payments has been exceeded.  The allowable amount of the claim can be:"

  public claimFormGroup: FormGroup
  public packages = [];
  public packageID: string;
  public consumerID: string;
  public pack: IConsumerPackage;
  public addClaimSelect;

  public file
  public fileReceipt
  public receipt: string;
  public imageSrc;
  public newClaim

  private componentActive: boolean = true

  public consumerPermissions: IConsumerPermissions;
  public employerPermissions: IEmployerPermissions;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private consumerService: ConsumerServiceService,
    private modalWindow: ModalWindowService,
    private userService: UsersService
  ) {

    this.claimFormGroup = this.fb.group({
      package: ['', Validators.required],
      dateOfService: ['', Validators.required],
      amount: ['',  Validators.required]
    })

    this.consumerID = this.authService.getUserId()
    this.consumerService.setCurrentPage({select: 'claims' })

    this.consumerService.getCurrentPackage()
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(data =>{
        this.pack = data
      })
  }

  ngOnInit(): void {


    if(this.pack){
      this.packages.push(this.pack);
      this.claimFormGroup.get('package').setValue(this.pack._id)
    } else{
      this.consumerService.getConsumerById(this.consumerID)
        .pipe(takeWhile(() => this.componentActive))
        .subscribe(data => {
          this.consumerPermissions = data[0].permissions.canFillClaims;
          this.employerPermissions = data[0].employer.permissions.canFillClaims;

          if(this.consumerPermissions && this.employerPermissions){
            this.packages = data[0].packages
          } else{
            this.modalWindow.showPageDialog(this.errorPermissions);
            this.router.navigate(['..'])
          }
        })
    }
  }

  public enableInput(): void{
    this.packageID = this.claimFormGroup.get('package').value;
    this.consumerService.getPackageById(this.packageID)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(data => {
        this.pack = data[0]
      })
  }

  public submit(): void{
    this.claimFormGroup.markAllAsTouched();

    if(this.claimFormGroup.valid){
      if(this.receipt){
        const claimAmount = this.claimFormGroup.get('amount').value;

        if ( this.pack.availableAmount < claimAmount ){
          this.modalWindow.showPageDialog(
            `${this.errorAvailableAmount} ${this.pack.availableAmount}`)
        } else {
          this.newClaim = {
            receipt: this.receipt,
            serviceDate: this.claimFormGroup.get("dateOfService").value,
            amount: this.claimFormGroup.get('amount').value,
            package: this.claimFormGroup.get('package').value
          }

          this.consumerService.addClaim(this.consumerID, this.newClaim )
            .pipe(takeWhile(() => this.componentActive))
            .subscribe(() => {
              this.modalWindow.showPageDialog(`You created new claim`)
              this.router.navigate(['consumer/claims'])
            })
        }
      } else {
        this.modalWindow.showPageDialog(this.errorReceipt)
      }

    }
  }

  public fileChange(event): void {
     this.file = event[0];
     this.receipt = this.file.name;
    if (event) {
      const file = event[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', this.file)
      this.userService.uploadLogo(formData).subscribe()
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

 }
