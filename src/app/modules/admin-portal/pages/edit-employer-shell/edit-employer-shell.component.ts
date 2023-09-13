import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeWhile } from 'rxjs';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { UsersService } from 'src/app/modules/shared/services/users.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-employer-shell',
  templateUrl: './edit-employer-shell.component.html',
  styleUrls: ['./edit-employer-shell.component.scss'],
})
export class EditEmployerShellComponent implements OnInit, OnDestroy {
  employer$: Observable<object>;
  employer;
  employerId: string;
  componentActive: boolean = true;
  logo: string;
  employerFormGroup: any;

  constructor(
    private adminService: AdminService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private modalWindow: ModalWindowService
  ) {
    this.employerId = this.route.snapshot.paramMap.get('id');
    this.employer$ = this.adminService.getEmployerByID(this.employerId);
  }

  ngOnInit(): void {}

  onEmployerFormGroupEmit(employerFormGroup: FormGroup): void {
    employerFormGroup.controls['password'].clearValidators();

    this.employer$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((employer) => {
        this.employer = employer[0];

        if (this.employer.logo !== 'none') {
          this.logo = this.employer.logo;
        }

        if (employer) {
          employerFormGroup.patchValue(this.employer);
          employerFormGroup.patchValue(this.employer['address']);
          employerFormGroup.patchValue(this.employer['permissions']);
        }
      });
  }

  editEmployer(data: object): void {
    if (data[1]) {
      console.log(data[1])
      const uploadStatus = this.usersService.uploadLogo(data[1]).subscribe();
    } else {
      data[0].logo = this.employer.logo;
    }

    if (!data[0].password) {
      delete data[0].password;
    }

    const updateStatus = this.adminService
      .updateEmployer(this.employerId, data[0])
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
        setTimeout( ()=> this.modalWindow.showPageDialog(`You have made changes to ${data[0].companyName} employer`), 700)

      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
