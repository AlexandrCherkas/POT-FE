import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-employer',
  templateUrl: './add-new-employer.component.html',
  styleUrls: ['./add-new-employer.component.scss'],
  host: { class: 'app-add-new-employer' },
})
export class AddNewEmployerComponent implements OnInit {
  @Output() employerFormGroupEmit = new EventEmitter<FormGroup>();
  @Output() employerFormGroupSubmit = new EventEmitter<object>();
  @Input() logoName;

  public uploadImage: string = '../../../../../../assets/images/upoload.png';
  public fileName: string;

  public addEmployerFormGroup: FormGroup;
  public logo;
  public imageSrc;

  constructor(private fb: FormBuilder) {
    this.createAddEmployerFormGroup();
  }

  ngOnInit(): void {
    this.employerFormGroupEmit.emit(this.addEmployerFormGroup);
  }

  fileChange(event) {
    this.logo = event.target.files[0];
    this.fileName = this.logo.name;

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.addEmployerFormGroup.markAllAsTouched();
    if (this.addEmployerFormGroup.valid) {
      let employer = {
        companyName: this.addEmployerFormGroup.controls['companyName'].value,
        loginName: this.addEmployerFormGroup.controls['loginName'].value,
        password: this.addEmployerFormGroup.controls['password'].value,
        countryCode: this.addEmployerFormGroup.controls['countryCode'].value,
        logo: this.fileName,
        address: {
          street: this.addEmployerFormGroup.controls['street'].value,
          city: this.addEmployerFormGroup.controls['city'].value,
          state: this.addEmployerFormGroup.controls['state'].value,
          zipCode: this.addEmployerFormGroup.controls['zipCode'].value,
          phone: this.addEmployerFormGroup.controls['phone'].value,
        },
        permissions: {
          canFillClaims:
            this.addEmployerFormGroup.controls['canFillClaims'].value || false,
          canAddConsumers:
            this.addEmployerFormGroup.controls['canAddConsumers'].value || false,
        },
      };

      let formData = undefined;

      if (this.logo) {
        formData = new FormData();
        formData.append('file', this.logo);
      } else {
        employer.logo = 'none';
      }

      this.employerFormGroupSubmit.emit([employer, formData]);
    }
  }

  createAddEmployerFormGroup(): void {
    this.addEmployerFormGroup = this.fb.group({
      companyName: ['', Validators.required],
      loginName: ['', Validators.required],
      password: ['', [Validators.minLength(3), Validators.required]],
      countryCode: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.maxLength(6), Validators.required]],
      phone: ['', [Validators.maxLength(10), Validators.required]],
      logo: [''],
      canFillClaims: [''],
      canAddConsumers: [''],
    });
  }
}
