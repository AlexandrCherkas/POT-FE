import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, merge, startWith, Subject, switchMap, takeWhile, of as observableOf } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IEmployerPermissions } from 'src/app/modules/employer-portal/interfaces/employerPermissions';
import { IConsumerPermissions } from '../../interfaces/consumerPermissions';
import { ConsumerServiceService } from '../../services/consumer-service.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnChanges, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['claimNumber','serviceDate', 'plan', 'amount', 'status'];

  public dataSource: MatTableDataSource<any>;
  public claims
  public lengthClaim: number;
  public pageSize: number = 8;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public componentActive = true;
  public page;
  private updateClaimsSubj = new Subject<Event>()
  public consumerID: string;

  public consumerPermissions: IConsumerPermissions;
  public employerPermissions: IEmployerPermissions;

  constructor(
    private consumerService: ConsumerServiceService,
    private authService: AuthService,
    private router: Router,
    private modalWindow: ModalWindowService,
    private route: ActivatedRoute
    ) {
    this.consumerID = this.authService.getUserId()
    this.consumerService.setCurrentPackage(undefined)
  }

  ngOnChanges(): void { }

  ngAfterViewInit() {

    this.sort.sortChange
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page, this.updateClaimsSubj.asObservable())
      .pipe(
        takeWhile(() => this.componentActive),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.consumerService.getClaimByConsumer(
            this.consumerID ,
            this.paginator.pageIndex,
            this.pageSize,
            this.sort.active,
            this.sort.direction
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          return data;
        })
      )
      .subscribe((data) => {
        this.consumerPermissions = data.permissions[0].permissions.canFillClaims
        this.employerPermissions = data.permissions[0].employer.permissions.canFillClaims
        this.lengthClaim = data.length;
        this.claims = data.result;
      }
        );
  }

  addClaim(): void {
    this.router.navigate(['consumer/claims/add'])
  }

  showError(): void{
    this.modalWindow.showPageDialog("You can't add a new Claim! Your rights have been restricted by Employer or Admin")
  }

}
