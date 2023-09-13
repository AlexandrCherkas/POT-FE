import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  public employeeFormGroup: FormGroup;

  @Output() employeeFormGroupEmit = new EventEmitter<FormGroup>();
  @Output() employeeFormGroupSubmit = new EventEmitter<object>();

  constructor(private fb: FormBuilder, private router: Router) {
    this.createAddEmployeeFormGroup();
  }

  ngOnInit(): void {
    this.employeeFormGroupEmit.emit(this.employeeFormGroup);
  }

  createAddEmployeeFormGroup(): void {
    this.employeeFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      balance: ['', Validators.required],
      ssn: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      loginName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      canFillClaims: [''],
    });
  }

  onSubmit(): void {
    this.employeeFormGroup.markAllAsTouched();

    if (this.employeeFormGroup.valid) {
      const consumer = {
        firstName: this.employeeFormGroup.controls['firstName'].value,
        lastName: this.employeeFormGroup.controls['lastName'].value,
        loginName: this.employeeFormGroup.controls['loginName'].value,
        password: this.employeeFormGroup.controls['password'].value,
        email: this.employeeFormGroup.controls['email'].value,
        balance: this.employeeFormGroup.controls['balance'].value,
        ssn: this.employeeFormGroup.controls['ssn'].value,
        permissions: {
          canFillClaims:
            this.employeeFormGroup.controls['canFillClaims'].value || false,
        },
      };

      this.employeeFormGroupSubmit.emit(consumer);
    }
  }

  onCancel(): void {
    this.router.navigate(['./employer/employees'])
  }
}
