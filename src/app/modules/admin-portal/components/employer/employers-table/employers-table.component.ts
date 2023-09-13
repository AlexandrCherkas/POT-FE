import {
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  catchError,
  map,
  merge,
  startWith,
  switchMap,
  takeWhile,
  Observable,
  of as observableOf,
  Subject,
} from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-employers-table',
  templateUrl: './employers-table.component.html',
  styleUrls: ['./employers-table.component.scss'],
})
export class EmployersTableComponent implements OnChanges, AfterViewInit {
  @Input() employers;
  @Input() searchEvent;
  @Input() amountEmployers: Observable<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = [
    'companyName',
    'countryCode',
    'companyActions',
  ];
  public deleteMessage: string = "You have deleted the employer: "
  public dataSource: MatTableDataSource<any>;
  public lengthEmployers: number;
  public pageSize: number = 8;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public componentActive = true;

  private updateEmployersSubj = new Subject<Event>();

  constructor(
    private adminService: AdminService,
    private modalWindows: ModalWindowService
    ) {}

  ngOnChanges(): void {
    this.amountEmployers
      .pipe()
      .subscribe((length) => (this.lengthEmployers = length));
  }

  ngAfterViewInit() {
    this.sort.sortChange
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.updateEmployersSubj.asObservable()
    )
      .pipe(
        takeWhile(() => this.componentActive),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.adminService
            .searchEmployer(
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
        this.lengthEmployers = data.length;
        this.employers = data.result;
      });
  }

  onSelectEmployer(employer) {
    this.adminService.setSelectedEmployer(employer);
  }

  updateEmployers(event): void {
    this.searchEvent = undefined;
    this.updateEmployersSubj.next(event);
  }

  deleteEmployerById(id: string): void {
    this.adminService.deleteEmployerByID(id)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((data) => {
        console.log(data)
        this.modalWindows.showPageDialog(`${this.deleteMessage} ${data.deletedEmployer[0].companyName}` )
        if (data.employer.acknowledged) {
          this.updateEmployersSubj.next(data.employer.deletedCount);
        }
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
