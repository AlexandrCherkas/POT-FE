import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISearchClaim } from '../../../interfaces/searchClaim';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-search-claim',
  templateUrl: './search-claim.component.html',
  styleUrls: ['./search-claim.component.scss'],
})
export class SearchClaimComponent implements OnInit {

  @Output() changeValueSearch = new EventEmitter<ISearchClaim>();

  public searchFormGroup: FormGroup;


  public employers = [];

  public selectedEmployer: string;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.searchFormGroup = this.fb.group({
      claimNumber: [''],
      employer: [''],
    });

    this.adminService.getAllEmployers()
      .subscribe((employers) => {
        console.log(employers)
        employers.result.forEach((employer) => {
          this.employers.push({
            companyName: employer.companyName,
            companyID: employer._id
          });
        })
      });

  }

  ngOnInit(): void {}

  searchClaim(): void {
    this.searchFormGroup.markAllAsTouched();

    if (this.searchFormGroup.valid) {
      const inputClaimNumber: AbstractControl = this.searchFormGroup.get('claimNumber');
      const inputEmployerName: AbstractControl = this.searchFormGroup.get('employer');

      const searchRequest = {
        claimNumber: inputClaimNumber.value,
        employer: inputEmployerName.value,
      };
      this.changeValueSearch.emit(searchRequest);
    }

  }
}
