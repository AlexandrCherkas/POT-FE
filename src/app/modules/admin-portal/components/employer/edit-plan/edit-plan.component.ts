import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { Location } from '@angular/common';
import { IPlan } from '../../../interfaces/plan';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {

  public editFormGroup: FormGroup = new FormGroup({});
  public changeablePackage: IPlan;
  public employerName: string
  private employerID: string;
  private packageID: string;
  private componentActive;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute
  ) {

    this.route.paramMap.pipe().subscribe((params) => {
      this.employerID = params.get('id');
      this.packageID = params.get('_id');
    });

    this.editFormGroup =  this.fb.group(
      {
        name: ['', Validators.required],
        type: [{ value:'', disabled: true }],
        contribution: ['', Validators.required],
      })
  }

  ngOnInit(): void {

    if(this.packageID){
      this.adminService.getPlanFromEmployerByID(this.employerID, this.packageID)
      .subscribe(plan => {
        this.changeablePackage = plan;
        this.employerName = plan.companyName;
        this.editFormGroup.patchValue(plan);
      })
    } else{
      this.adminService
        .getEmployerPlans(this.employerID)
        .subscribe((employer) => {
          this.employerName = employer[0].companyName;
        });

      this.adminService.getWorkPackage()
        .subscribe(plan => {
          this.changeablePackage = plan;
          this.editFormGroup.patchValue(plan)
        })
    }
  }

  submit(): void{
    this.editFormGroup.markAllAsTouched();

    const name = this.editFormGroup.controls['name'].value
    const contribution = this.editFormGroup.controls['contribution'].value

    if(this.packageID && this.editFormGroup.valid && this.editFormGroup.dirty){
      const newPackage = this.editPackage(name, contribution)
      this.adminService.updatePlan(this.employerID, this.packageID, newPackage)
        .subscribe(data =>
          this.location.back()
        )
        }
    if(!this.packageID && this.editFormGroup.valid){
      const changeablePackage = this.editPackage(name, contribution)
      this.adminService.setWorkPackage(changeablePackage)
      this.location.back();
    }
  }


  editPackage(name: string, contribution: number ): IPlan{
    return {
      name: name,
      type: this.changeablePackage.type,
      contribution: contribution,
      startDate: this.changeablePackage.startDate,
      endDate: this.changeablePackage.endDate,
      payrollFrequency: this.changeablePackage.payrollFrequency,
      isActive: this.changeablePackage.isActive
    }
  }

  redirectToEmployer():void{
    this.router.navigate([`admin/employers/employer/${this.employerID}/manage-plans`])
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
