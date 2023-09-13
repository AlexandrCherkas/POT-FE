import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, takeWhile, tap } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { IClaim } from '../../../interfaces/claim';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-claim-info',
  templateUrl: './claim-info.component.html',
  styleUrls: ['./claim-info.component.scss'],
})
export class ClaimInfoComponent implements OnInit {
  private messageApproved: string = 'message-approved-claim';
  private messageDeny: string = 'message-deny-claim';
  public errorAvailableAmount: string = "The limit on insurance payments has been exceeded.  The allowable amount of the claim can be:"

  public claimID: string;
  public claim: IClaim;
  public receipt: string;
  public claimStatus: boolean;
  private componentActive: boolean = true;

  public permission = false;

  color: ThemePalette = 'accent';

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private modalWindow: ModalWindowService
  ) {
    this.route.paramMap
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((params) => {
        this.claimID = params.get('id');
      });
  }

  ngOnInit(): void {
    this.adminService
      .getClaimByID(this.claimID)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((data) => {
        console.log(data)
        this.receipt = data[0].receipt
        this.claim = data[0];
        if (data[0].isApproved == null) {
          this.claimStatus = true;
        } else {
          this.claimStatus = false;
        }
      });
  }

  approveClaim(): void {
    if(this.claim.package.availableAmount > this.claim.amount){
      this.claim.isApproved = true;

      this.adminService
        .updateClaimByID(this.claimID, this.claim)
        .subscribe((data) => {
         this.modalWindow.showPageDialog(
           this.messageApproved,
           `Claim Number: ${data.claimNumber}`
         );
         this.router.navigate(['admin/claims']);
        });
    }else{
      this.modalWindow.showPageDialog(`${this.errorAvailableAmount} ${this.claim.package.availableAmount }$`)
    }

  }

  denyClaim(): void {
    this.claim.isApproved = false;

    this.adminService
      .updateClaimByID(this.claimID, this.claim)
      .subscribe((data) => {
        this.modalWindow.showPageDialog(
          this.messageDeny,
          `Claim Number: ${data.claimNumber}`
        );
        this.router.navigate(['admin/claims']);
      });
  }

  cancel(): void {
    this.router.navigate(['admin/claims']);
  }

  showReceipt():void{
    this.modalWindow.showReceipt(this.receipt)
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
