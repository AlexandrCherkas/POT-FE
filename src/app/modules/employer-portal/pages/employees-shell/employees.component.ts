import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subject, switchMap, takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IEmployerPermissions } from '../../interfaces/employerPermissions';
import { ISearchEmployee } from '../../interfaces/searchEmployee';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public errorsSearch = 'text-error-search';

  @Output() changeValueSearch = new EventEmitter<ISearchEmployee>();

  private amountEmployees = new Subject<number>();
  public amount$ = this.amountEmployees.asObservable();

  public addConsumerPermissions: boolean
  private componentActive = true;
  public employees;
  public employerID: string;
  public searchEvent;
  public searchEmployeesSubj = new Subject<Event>();

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;
  public displayProgressSpinner = false;

  constructor(
    private employerService: EmployerService,
    private modalWindow: ModalWindowService,
    private authService: AuthService
    ) {
      this.employerID = this.authService.getUserId();

    }

  ngOnInit(): void {

    this.employerService.getEmployerByID(this.employerID)
      .subscribe(employer => {
        this.addConsumerPermissions = employer[0].permissions.canAddConsumers
      })


    this.searchEmployeesSubj
    .pipe(
      takeWhile(() => this.componentActive),
      switchMap((event: any) =>
        this.employerService.searchConsumers(event, 0, 8)
      )
    )
    .subscribe((employers: any) => {
      if (!employers.length) {
        this.modalWindow.showPageDialog(this.errorsSearch);
      } else {
        this.employees = employers.result;
        this.amountEmployees.next(employers.length) ;
      }
      this.displayProgressSpinner = false;
    });
}

  searchEmployees(event): void {
    this.displayProgressSpinner = true;
    this.searchEmployeesSubj.next(event);
    this.searchEvent = event;
  }

  errorAdd(): void{
    this.modalWindow.showPageDialog("You can't add a new employee! Your rights have been restricted by the administrator")
  }
}
