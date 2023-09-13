import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UsersService } from 'src/app/modules/shared/services/users.service';

@Component({
  selector: 'app-edit-employer',
  templateUrl: './edit-employer.component.html',
  styleUrls: ['./edit-employer.component.scss']
})
export class EditEmployerComponent implements OnInit {

  employerId: string = this.authService.getUserId();
  employer$: Observable<any> | undefined;

  public imageSrc;
  public logo;
  public fileName: string;
  public newFileName: string;
  public employerFormGroup: FormGroup;
  public componentActive = true;
  public valueChanges = { address: {} };
  public innitialValues;
  public addressKeys = ['street', 'city', 'state', 'zipCode', 'phone'];
  public basicInfoKeys = ['companyName', 'loginName', 'state', 'zipCode', 'phone'];
  public submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {
    this.employerFormGroup = this.fb.group({
      companyName: ['', Validators.required],
      loginName: ['', Validators.required],
      password: ['', Validators.minLength(4)],
      countryCode: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.maxLength(6), Validators.required]],
      phone: ['', [Validators.maxLength(10), Validators.required]],
      logo: [''],
    });
    this.employer$ = this.usersService.getEmployer(this.employerId);
    this.employer$.subscribe((employer) => {

      if (employer[0].logo !== 'none') {
        this.newFileName = employer[0].logo;
      }

      this.employerFormGroup.controls['companyName'].reset(
        employer[0].companyName
      );
      this.employerFormGroup.controls['loginName'].reset(employer[0].loginName);
      this.employerFormGroup.controls['countryCode'].reset(
        employer[0].countryCode
      );
      this.employerFormGroup.controls['street'].reset(
        employer[0].address.street
      );
      this.employerFormGroup.controls['city'].reset(employer[0].address.city);
      this.employerFormGroup.controls['state'].reset(employer[0].address.state);
      this.employerFormGroup.controls['zipCode'].reset(
        employer[0].address.zipCode
      );
      this.employerFormGroup.controls['phone'].reset(employer[0].address.phone);

      this.innitialValues = this.employerFormGroup.value;
      this.valueChanges = {
        address: {
          street: employer[0].address.street,
          city: employer[0].address.city,
          state: employer[0].address.state,
          zipCode: employer[0].address.zipCode,
          phone: employer[0].address.phone
        },
      };
    });
    for (let field in this.employerFormGroup.controls) {
      const control = this.employerFormGroup.get(field);
      control.valueChanges.subscribe((change) => {
        if (this.addressKeys.includes(field)) {
          const address = { [field]: change };
          this.valueChanges.address = Object.assign(
            this.valueChanges.address,
            address
          );
        } else {
          const changes = { [field]: change };
          this.valueChanges = Object.assign(this.valueChanges, changes);
          if (this.innitialValues && this.innitialValues[field] === change) {
            delete this.valueChanges[field];
          }
        }
      });
    }
  }
  ngOnInit(): void {
    this.employerFormGroup.controls['logo'].valueChanges.subscribe((value) => {
      this.fileName = value;
    });
  }
  onCancel() {
    this.employerFormGroup.reset(this.innitialValues);
  }
  onSubmit() {
    this.employerFormGroup.markAllAsTouched();
    let addressHasChanged = false;
    let innitialAddressValues = {};
    this.addressKeys.forEach(key => {
      innitialAddressValues[key] = this.innitialValues[key];
    });
    if (JSON.stringify(innitialAddressValues) !== JSON.stringify(this.valueChanges.address)) {
      addressHasChanged = true;
    }
    
    if (this.employerFormGroup.valid) {
      if (Object.keys(this.valueChanges).length > 1 ||
      addressHasChanged) {
        if (this.logo) {
          this.valueChanges['logo'] = this.logo.name;
          let formData = new FormData();
          formData.append('file', this.logo);
          this.usersService
            .updateEmployer(this.employerId, this.valueChanges)
            .subscribe();
          this.usersService.uploadLogo(formData)
          .subscribe((data) => {
            this.submitted = true;
            setTimeout(() => {
              this.submitted = false;
            }, 3000);
          });
        } else {
          this.usersService
            .updateEmployer(this.employerId, this.valueChanges)
            .subscribe((data) => {
              this.submitted = true;
              setTimeout(() => {
                this.submitted = false;
              }, 3000);
            });
        }
      }
    }
  }
  fileChange(event) {
    this.logo = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }

}
