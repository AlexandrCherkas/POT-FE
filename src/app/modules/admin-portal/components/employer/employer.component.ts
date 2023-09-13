import { Subject, switchMap, takeWhile } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { ISearchEmployer } from '../../interfaces/searchEmployer';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { Observable, Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { AfterContentChecked,  ChangeDetectorRef,  Component,  ElementRef,  Input,  OnInit,  ViewChild,} from '@angular/core';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
})
export class EmployerComponent implements OnInit {
  public errorsSearchEmployer = 'text-error-search';

  @Output() changeValueSearch = new EventEmitter<ISearchEmployer>();

  private amountEmployers = new Subject<number>();
  public amount$ = this.amountEmployers.asObservable();

  private componentActive = true;
  public employers;
  public searchEvent;
  public searchEmployersSubj = new Subject<Event>();

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;
  public displayProgressSpinner = false;

  constructor(
    private adminService: AdminService,
    private modalWindow: ModalWindowService
  ) {}

  ngOnInit(): void {
    this.adminService.setNameUpdateEmployer = undefined;

    this.searchEmployersSubj
      .pipe(
        takeWhile(() => this.componentActive),
        switchMap((event: any) =>
          this.adminService.searchEmployer(event, 0, 8)
        )
      )
      .subscribe((employers: any) => {
        if (!employers.length) {
          this.modalWindow.showPageDialog(this.errorsSearchEmployer);
        } else {
          this.employers = employers.result;
          this.amountEmployers.next(employers.length) ;
        }
        this.displayProgressSpinner = false;
      });
  }

  searchEmployers(event) {
    this.displayProgressSpinner = true;
    this.searchEmployersSubj.next(event);
    this.searchEvent = event;
  }
}
