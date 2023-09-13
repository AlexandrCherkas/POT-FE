import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, merge, Observable, startWith, takeWhile, of as observableOf, Subject, map, switchMap } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IEmployerPermissions } from '../../interfaces/employerPermissions';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-table-employees',
  templateUrl: './table-employees.component.html',
  styleUrls: ['./table-employees.component.scss']
})
export class TableEmployeesComponent implements OnChanges, AfterViewInit {

  @Input() employees;
  @Input() searchEvent;
  @Input() amountEmployees: Observable<number>

  @Output() employerPermissions = new EventEmitter<IEmployerPermissions>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public deleteMessage = "delete-message";

  public displayedColumns: string[] = ['firstName', 'lastName', 'ssn', 'enrollments', 'actions'];
  public dataSource: MatTableDataSource<any>;
  public lengthEmployees: number
  public pageSize: number = 8;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public employerID: string;
  public componentActive = true;

  private updateEmployeesSubj = new Subject<Event>();

  constructor(
    private employerService: EmployerService,
    private modalWindow: ModalWindowService,
    private authService: AuthService,
    private router: Router,
    private AuthService: AuthService
    ) { }

  ngOnChanges(): void {
      this.amountEmployees
      .pipe()
      .subscribe(length => this.lengthEmployees = length)
  }

  ngAfterViewInit() {
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
          return this.employerService
            .searchConsumers(
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
        this.lengthEmployees = data.length;
        this.employees = data.result;
      });
  }

  deleteConsumer(consumerID: string, firstName: string, lastName: string ): void{
    const employerID = this.AuthService.getUserId();

    this.employerService.deleteConsumer(employerID, consumerID)
      .subscribe(data =>{
        if(data){
          this.modalWindow.showPageDialog("You deleted: " + firstName + ' ' + lastName)
          this.updateEmployeesSubj.next(event)
        }
      })
  }

  updateEmployees(event): void {
    this.searchEvent = undefined;
    this.updateEmployeesSubj.next(event);
  }

  goToEnrollments(employeeID: string): void {
    this.router.navigate([`employer/employees/${employeeID}/enrollments`]);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
