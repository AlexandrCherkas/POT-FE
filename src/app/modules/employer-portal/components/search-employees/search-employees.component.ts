import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ISearchEmployee } from '../../interfaces/searchEmployee';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.scss']
})
export class SearchEmployeesComponent implements OnInit {

  @Output() changeValueSearch = new EventEmitter<ISearchEmployee>();

  public searchFormGroup: FormGroup;

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;
  public displayProgressSpinner = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
    this.searchFormGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      ssn: ['', Validators.maxLength(8)]
    });

  }

  ngOnInit(): void {}

  searchEmployee(): void {
    this.searchFormGroup.markAllAsTouched();

    if (this.searchFormGroup.valid) {
      const searchRequest = {
        firstName: this.searchFormGroup.get('firstName').value,
        lastName: this.searchFormGroup.get('lastName').value,
        ssn: this.searchFormGroup.get('ssn').value
      };
      this.changeValueSearch.emit(searchRequest);
    }

  }

}
