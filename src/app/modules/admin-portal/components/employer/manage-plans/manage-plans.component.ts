import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { IEmployer } from '../../../interfaces/employer';
import { IPlan } from '../../../interfaces/plan';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss'],
})
export class ManagePlansComponent implements OnInit{

  public messageAboutInitialization = "message-about-initialization"
  public currentDate;
  public employerName;
  public employerID: string;
  public displayedColumns: string[] = ['type', 'isActive', 'actions'];

  public dataSource;
  public packages: IPlan[] = []
  private componentActive: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private modalWindow: ModalWindowService
  ) {
    this.route.paramMap
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((params) => {
        this.employerID = params.get('id');
      });
  }

  ngOnInit(): void {
    this.getEmployerPlans();
    this.formatDateTime(Date.now());
    this.adminService.setWorkPackage(undefined)
  }

  initializePlan(plan: IPlan, packageID: string): void{
    const newPackage = this.changePackage(plan)
    this.adminService.updatePlan(this.employerID, packageID, newPackage)
      .subscribe(data => {
        this.modalWindow.showPageDialog(this.messageAboutInitialization);
        this.getEmployerPlans()
      })
  }

  removePlan(planID: string, planName: string): void{
    this.adminService.deletePlanFromEmployer(this.employerID, planID)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(data => {
          this.modalWindow.showPageDialog(`You deleted plan: ${planName}`);
          this.getEmployerPlans()
      })
  }

  infoAboutPlan(plan: IPlan){
    this.modalWindow.showInfoPageDialog(plan)
  }

  getEmployerPlans():void {
    this.adminService
    .getEmployerPlans(this.employerID)
    .pipe(takeWhile(() => this.componentActive))
    .subscribe((employer) => {
      this.employerName = employer[0].companyName;
      this.dataSource = new MatTableDataSource(employer[0].plans)
    } )
  }

  formatDateTime(date: number | string): void{
    this.currentDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
  }

  compareDate(date: string): boolean{
    return date < this.currentDate? true : false
  }

  changePackage(plan: IPlan): IPlan{
    return {
      name: plan.name,
      type: plan.type,
      contribution: plan.contribution,
      startDate: plan.startDate,
      endDate: plan.endDate,
      payrollFrequency: plan.payrollFrequency,
      isActive: true
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
