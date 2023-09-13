import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-employee-table-shell',
  templateUrl: './employee-table-shell.component.html',
  styleUrls: ['./employee-table-shell.component.scss'],
})
export class EmployeeTableShellComponent implements OnInit {
  public errorsSearch = 'text-error-search';
  private consumersAmount = new Subject<number>();
  public amount$ = this.consumersAmount.asObservable();
  private componentActive = true;
  public consumers;
  public searchEvent;
  public searchConsumersSubj = new Subject<Event>();

  employer: any;
  employerId: string;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private modalWindow: ModalWindowService
  ) {
    this.employerId = this.route.snapshot.paramMap.get('id');
    this.adminService.getEmployerByID(this.employerId).subscribe((employer) => {
      this.employer = employer[0];
    });
    this.searchConsumersSubj
    .pipe(
      takeWhile(() => this.componentActive),
      switchMap((event: any) =>
        this.adminService.searchConsumers(this.employerId, event, 0, 8)
      )
    )
    .subscribe((consumers: any) => {
      if (!consumers.length) {
        this.modalWindow.showPageDialog(this.errorsSearch);
      } else {
        this.consumers = consumers.result;
        this.consumersAmount.next(consumers.length) ;
      }
    });
  }

  ngOnInit(): void {

  }

  selectDifferentEmployee(): void {
    this.router.navigate(['admin/employers']);
  }

  searchEmployees(event) {
    this.searchConsumersSubj.next(event);
    this.searchEvent = event;
  }
}
