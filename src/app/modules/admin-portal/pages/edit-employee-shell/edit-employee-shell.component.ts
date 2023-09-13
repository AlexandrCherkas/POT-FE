import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeWhile } from 'rxjs';
import { UsersService } from 'src/app/modules/shared/services/users.service';

@Component({
  selector: 'app-edit-employee-shell',
  templateUrl: './edit-employee-shell.component.html',
  styleUrls: ['./edit-employee-shell.component.scss'],
})
export class EditEmployeeShellComponent implements OnInit, OnDestroy {
  employeeId: string;
  employee$: Observable<any>;
  employee: any;
  employeeFormGroup: any;
  componentActive: boolean = true;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.employee$ = this.usersService.getConsumer(this.employeeId);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  onEmployeeFormGroupInit(employeeFormGroup): void {
    employeeFormGroup.controls['password'].clearValidators();

    this.employee$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((employee) => {
        this.employee = employee[0];

        if (employee) {
          employeeFormGroup.patchValue(this.employee);
          employeeFormGroup.patchValue(this.employee['permissions']);
        }
      });
  }

  editEmployee(data: object): void {
    if (!data['password']) {
      delete data['password'];
    }

    const registerStatus = this.usersService
      .updateConsumer(this.employeeId, data)
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}
