import { AfterViewInit, Component, Input, OnInit, OnChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, Observable, startWith, Subject, switchMap, takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent  implements OnInit, AfterViewInit, OnChanges
{
  @Input() employerId: any;
  @Input() searchEvent;
  @Input() consumersAmount: Observable<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private updateEmployeesSubj = new Subject<Event>();

  public dataSource: MatTableDataSource<any>;
  public consumers: any;
  public displayedColumns: string[] = ['lastName', 'loginName', 'email', 'actions'];
  public resultsLength: number = 8;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public componentActive = true;

  public consumersLength: number;
  public pageSize: number = 8;

  constructor(
    private adminService: AdminService,
    private modalWindow: ModalWindowService
  ) {}

  ngOnInit():void{

  }

  ngOnChanges(): void {
    this.consumersAmount
      .pipe()
      .subscribe((length) => (this.consumersLength = length));
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.updateEmployeesSubj.asObservable()
    )
      .pipe(
        takeWhile(() => this.componentActive),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.adminService
            .searchConsumers(
              this.employerId,
              this.searchEvent,
              this.paginator.pageIndex,
              this.pageSize,
              this.sort.active,
              this.sort.direction
            )
            .pipe(catchError(() => observableOf(null)));
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
        this.consumersLength = data.length;
        this.consumers = data.result;
      });
  }

  updateEmployeesTable(event): void {
    this.searchEvent = undefined;
    this.updateEmployeesSubj.next(event);
  }

  deleteConsumer(
    consumerID: string,
    firstName: string,
    lastName: string
  ): void {
    this.adminService
      .deleteConsumer(this.employerId, consumerID)
      .subscribe((data) => {
        if (data) {
          this.modalWindow.showPageDialog(
            'You deleted consumer: ' + firstName + ' ' + lastName
          );
          this.updateEmployeesSubj.next(event);
        }
      });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
