import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, startWith, Subject, switchMap, takeWhile, of as observableOf, Observable } from 'rxjs';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-claims-table',
  templateUrl: './claims-table.component.html',
  styleUrls: ['./claims-table.component.scss']
})
export class ClaimsTableComponent implements OnChanges, AfterViewInit {

  @Input() claims;
  @Input() searchEvent;
  @Input() amountClaims: Observable<number>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['claimNumber','consumer.firstName', 'employer.companyName', 'package.startDate', 'package.name', 'amount', 'isApproved'];
  public dataSource: MatTableDataSource<any>;

  public lengthClaim: number;
  public pageSize: number = 8;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public componentActive = true;

  private updateClaimsSubj = new Subject<Event>()

  constructor(private adminService: AdminService) {}

  ngOnChanges(): void {
    this.amountClaims
    .pipe()
    .subscribe(length => this.lengthClaim = length)
}
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
          return this.adminService.searchClaim(
            this.searchEvent,
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
        console.log(data)
        this.lengthClaim = data.length;
        this.claims = data.result;
      }
        );
  }

  updateClaims(event): void {
    this.searchEvent = undefined;
    this.updateClaimsSubj.next(event)
  }

}
