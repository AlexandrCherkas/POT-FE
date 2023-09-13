import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subject, switchMap, takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { ISearchClaim } from '../../interfaces/searchClaim';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
})
export class ClaimsComponent implements OnInit {

  public errorsSearchClaim = 'text-error-search-claim';

  @Output() changeValueSearch = new EventEmitter<ISearchClaim>();

  private amountClaims = new Subject<number>();
  public amount$ = this.amountClaims.asObservable();

  public statuses = ['Pending', 'Approved', 'Denied'];
  public selectedStatus: string;

  public claims;
  public searchEvent;
  public searchStatus;
  public searchClaimsSubj = new Subject<Event>();

  private componentActive = true;

  public selectViewFormGroup: FormGroup

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;
  public displayProgressSpinner = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private modalWindow: ModalWindowService
  ) {
    this.selectViewFormGroup = this.fb.group({
      selectView: ['']
    });
  }

  ngOnInit(): void {

    this.searchClaimsSubj
    .pipe(
      takeWhile(() => this.componentActive),
      switchMap((event: any) =>
        this.adminService.searchClaim(event, 0, 8)
      )
    )
    .subscribe((claims: any) => {
      if (!claims.length) {
        this.modalWindow.showPageDialog(this.errorsSearchClaim);
      } else {
        this.claims = claims.result;
        this.amountClaims.next(claims.length) ;
      }
      this.displayProgressSpinner = false;
    });

  }

  public searchClaims(event): void {
    this.displayProgressSpinner = true;
    this.searchEvent = {
      claimNumber: event.claimNumber,
      employer: event.employer,
      status: this.searchStatus
    }
    this.searchClaimsSubj.next(this.searchEvent);
  }

  public changeStatusClaim(): void{
    this.searchStatus = this.selectViewFormGroup.get('selectView').value;
    this.displayProgressSpinner = true;
    if(!this.searchEvent){
      this.searchEvent = {
        claimNumber: "",
        employer: "",
        status: this.searchStatus
      }
    } else{
      this.searchEvent = {
        claimNumber: this.searchEvent.claimNumber,
        employer: this.searchEvent.employer,
        status: this.searchStatus
      }
    }
    this.searchClaimsSubj.next(this.searchEvent);

  }

}
