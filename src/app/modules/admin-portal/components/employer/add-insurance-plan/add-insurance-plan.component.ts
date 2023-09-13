import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { forkJoin, merge, Subscription, takeWhile, tap } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { IPlan } from '../../../interfaces/plan';
import { AdminService } from '../../../services/admin.service';
import { CustomValidators } from '../../../validators/dateComparison';

@Component({
  selector: 'app-add-insurance-plan',
  templateUrl: './add-insurance-plan.component.html',
  styleUrls: ['./add-insurance-plan.component.scss'],
})
export class AddInsurancePlanComponent implements OnInit {
  public errorAddPackage = 'text-error-add-package';
  public errorEditPackage = 'text-error-edit-package';

  public packageFormGroup: FormGroup = new FormGroup({});
  public updatePage: boolean;
  public namePackage: string;

  public name: string;
  public type: string;
  public contribution: number;
  public isActive: boolean = false;
  public startDate: string;
  public endDate: string;
  public payrollFrequency: string

  public employerID: string;
  public packageID: string;
  public workPackage: IPlan;

  public employerName: string;
  public payrollFrequencyArray = ['weekly', 'monthly'];
  public typesOfPackages = ['Dental', 'Family', "All Inclusive", "Sport"];
  public displayedColumns: string[] = ['name','type','contribution','isActive',];
  public dataSource;
  componentActive = true

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private modalWindow: ModalWindowService,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.route.paramMap.pipe().subscribe((params) => {
      this.employerID = params.get('id');
      this.packageID = params.get('_id');
    });

    this.activatedRoute.data.subscribe(
      (data) => (this.updatePage = data?.['update'])
    );

    this.packageFormGroup = this.fb.group(
      {
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        payrollFrequency: ['', Validators.required],
        type: [{ value: '', disabled: false }, Validators.required],
      },
      { validator: CustomValidators.confirmDate('startDate', 'endDate') }
    );
  }

  ngOnInit(): void {
    if (this.updatePage) {
      this.adminService
        .getPlanFromEmployerByID(this.employerID, this.packageID)
        .subscribe((plan) => {
          console.log(plan)
          this.employerName = plan.companyName;
          this.workPackage = plan;
          this.packageFormGroup.patchValue(plan);
          this.dataSource = new MatTableDataSource([plan]);
        });

      this.packageFormGroup.controls?.['type'].disable();
    } else {
      this.adminService
        .getEmployerPlans(this.employerID)
        .subscribe((employer) => {
          this.employerName = employer[0].companyName;
        });

      this.adminService.getWorkPackage()
        .pipe(takeWhile(() => this.componentActive))
        .subscribe((plan) => {
          if(plan){
            this.workPackage = plan
            this.packageFormGroup.patchValue(plan);
            this.dataSource = new MatTableDataSource([plan]);
          }
        })
    }
  }

  addPlan(): void {
    this.packageFormGroup.markAllAsTouched();
    this.getFormControlData();

    if (this.packageFormGroup.valid) {
      this.workPackage = this.getChangeablePackage()
      this.adminService.setWorkPackage(this.workPackage);
    }
  }

  editPackage(): void {
    this.packageFormGroup.markAllAsTouched();
    this.getFormControlData();

    if (this.updatePage && this.packageFormGroup.valid && this.packageFormGroup.dirty) {
      this.workPackage = this.getChangeablePackage()
      this.adminService.updatePlan(this.employerID, this.packageID, this.workPackage)
        .subscribe(data =>
          this.router.navigate([`admin/employers/employer/${this.employerID}/plans/update/${this.packageID}/edit`])
          )
    }
    if(this.updatePage && this.packageFormGroup.valid && !this.packageFormGroup.dirty){
      this.router.navigate([`admin/employers/employer/${this.employerID}/plans/update/${this.packageID}/edit`])
    }
    if(!this.updatePage && this.packageFormGroup.valid){
      this.workPackage = this.getChangeablePackage()
      this.adminService.setWorkPackage(this.workPackage)
      this.router.navigate([`admin/employers/employer/${this.employerID}/plans/add/edit`])
    }

  }

  submit(): void {
    this.packageFormGroup.markAllAsTouched();
    if (this.packageFormGroup.valid) {
      if (this.workPackage) {
        if (this.workPackage.name && this.workPackage.contribution) {
          this.adminService
            .setPlanEmployer(this.employerID, this.workPackage)
            .subscribe((res) => {
              this.modalWindow.showPageDialog(`You have created a new insurance plan: ${this.workPackage.name}`);
              this.adminService.setWorkPackage(undefined);
              this.router.navigate([
                `admin/employers/employer/${this.employerID}/plans`,
              ]);
            });
        } else {
          this.modalWindow.showPageDialog(this.errorEditPackage);
        }
      } else {
        this.modalWindow.showPageDialog(this.errorAddPackage);
      }
    }
  }

  update(): void {
    this.packageFormGroup.markAllAsTouched();

    if (this.packageFormGroup.valid) {
      this.startDate = this.packageFormGroup.get('startDate').value;
      this.endDate = this.packageFormGroup.get('endDate').value;
      this.payrollFrequency = this.packageFormGroup.get('payrollFrequency').value;

      this.adminService.updatePlan(this.employerID, this.packageID, this.getChangeablePackage())
        .subscribe((res) => {
          this.modalWindow.showPageDialog(`You are update plan: ${res.name} `);
          this.adminService.setWorkPackage(undefined);
          this.router.navigate([
            `admin/employers/employer/${this.employerID}/plans`,
          ]);
        });
    }
  }

  cancel(): void {
    this.router.navigate([`admin/employers/employer/${this.employerID}/plans`]);
  }

  refreshPlan(): void {
    this.adminService.setWorkPackage(undefined);
  }

  getFormControlData(): void{
    this.startDate =  this.packageFormGroup.controls?.['startDate'].value;
    this.endDate = this.packageFormGroup.controls?.['endDate'].value;
    this.payrollFrequency = this.packageFormGroup.controls?.['payrollFrequency'].value;
    this.type = this.packageFormGroup.controls?.['type'].value;
  }

  getChangeablePackage(): IPlan{
    return  this.workPackage?
      { name: this.workPackage.name,
        type: this.type,
        contribution: this.workPackage.contribution,
        startDate: this.startDate,
        endDate: this.endDate,
        payrollFrequency: this.payrollFrequency,
        isActive: this.workPackage.isActive
      } : {
        name: this.name,
        type: this.type,
        contribution: this.contribution,
        startDate: this.startDate,
        endDate: this.endDate,
        payrollFrequency: this.payrollFrequency,
        isActive: this.isActive
      }

  }

  redirectToEmployers() {
    this.router.navigate(['admin/employers']);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
