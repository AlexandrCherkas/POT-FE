import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { IConsumerPackage } from '../../interfaces/consumerPackage';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-enrollments-shell',
  templateUrl: './enrollments-shell.component.html',
  styleUrls: ['./enrollments-shell.component.scss']
})
export class EnrollmentsShellComponent implements OnInit {

  public consumerID: string;
  public displayedColumns: string[] = ['plan', 'election', 'contribution', 'action'];
  public consumer;
  public dataSource;
  public employerPlans = [];
  public consumerPackages = []
  public currentPackage: IConsumerPackage;
  private componentActive: boolean = true;

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;
  public displayProgressSpinner = false;

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService,
    private modalWindow: ModalWindowService) {

      this.route.paramMap
        .pipe(takeWhile(() => this.componentActive))
        .subscribe((params) => {
          this.consumerID = params.get('id');
        });

    this.employerService.getConsumerByID(this.consumerID)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(data => {
        this.consumer = data[0];
        this.dataSource = data[0].packages;
        this.consumerPackages = data[0].packages;
        this.employerPlans = data[0].employer.plans;
      })
    }

  ngOnInit(): void {

    this.employerService.getChangeTableEnrollment()
    .pipe(takeWhile(() => this.componentActive))
    .subscribe((data) => {
      if(data){
        this.getEnrollments();
        this.getChangeBalance()
      }}
    )
  }

  public updateEnrollments(): void{
    this.getEnrollments();
  }

  public update(packageID: string): void {
    this.employerService.getPackageByID(packageID)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(data => {
        this.modalWindow.showEnrollmentPage([], this.consumerID, data)
      })
  }

  public addEnrollment(): void{
    this.modalWindow.showEnrollmentPage(this.employerPlans, this.consumerID)
  }

  private getEnrollments(): void{
    this.displayProgressSpinner = true
    this.employerService.getConsumerByID(this.consumerID)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(data => {
        this.dataSource = data[0].packages;
        this.consumerPackages = data[0].packages;
        this.employerPlans = data[0].employer.plans;
        this.displayProgressSpinner = false
      })
  }

  private getChangeBalance(): void{
    this.employerService.getConsumerByID(this.consumerID)
    .pipe(takeWhile(() => this.componentActive))
    .subscribe(data => {
      this.consumer = data[0]
    })
  }


  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
