import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ISearchEmployer } from '../../../interfaces/searchEmployer';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-employers',
  templateUrl: './search-employers.component.html',
  styleUrls: ['./search-employers.component.scss'],
})
export class SearchEmployersComponent implements OnInit {

  @Output() changeValueSearch = new EventEmitter<ISearchEmployer>();

  public searchFormGroup: FormGroup;

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;
  public displayProgressSpinner = false;


  constructor(
    private fb: FormBuilder) {
    this.searchFormGroup = this.fb.group({
      employerName: [''],
      employerCode: ['', Validators.maxLength(3)],
    });
  }

  ngOnInit(): void {}

  searchEmployer(): void {
    this.searchFormGroup.markAllAsTouched();

    if (this.searchFormGroup.valid) {
      const inputEmployerName: AbstractControl = this.searchFormGroup.get('employerName');
      const inputEmployerCode: AbstractControl = this.searchFormGroup.get('employerCode');

      const searchRequest = {
        companyName: inputEmployerName.value,
        countryCode: inputEmployerCode.value
      };
      this.changeValueSearch.emit(searchRequest);
    }
  }

}
