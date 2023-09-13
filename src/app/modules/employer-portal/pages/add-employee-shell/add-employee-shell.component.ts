import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UsersService } from 'src/app/modules/shared/services/users.service';

@Component({
  selector: 'app-add-employee-shell',
  templateUrl: './add-employee-shell.component.html',
  styleUrls: ['./add-employee-shell.component.scss'],
})
export class AddEmployeeShellComponent implements OnInit {
  employerId: string;
  employeeFormGroup: any;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.employerId = this.authService.getUserId();
  }

  ngOnInit(): void {}

  onEmployeeFormGroupInit(employeeFormGroup): void {
    this.employeeFormGroup = employeeFormGroup;
  }

  addNewEmployee(data: object): void {
    const registerStatus = this.usersService
      .createConsumer(this.employerId, data)
      .subscribe(() => {
        this.router.navigate(['../'], {relativeTo: this.route})
      });
  }
}
