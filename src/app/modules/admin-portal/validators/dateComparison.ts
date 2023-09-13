import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static confirmDate(startDate: any, endDate: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlStartDate = control.get(startDate);
      const controlEndDate = control.get(endDate);
      return controlStartDate.value > controlEndDate.value? { mismatch: true } : null;
    };
  }
}
