import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import * as XLSX from 'xlsx';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  file: any;
  fileName: string;
  excelData: any;

  employerId: string = this.authService.getUserId();

  public submitted: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit(): void {}

  redirectToSetup() {
    this.router.navigate(['employer/setup']);
  }

  redirectToEmployees() {
    this.router.navigate(['employer/employees']);
  }

  fileChange(event) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

  import() {
    if (this.file) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(this.file);

      fileReader.onload = (e) => {
        const data = XLSX.read(fileReader.result, {type: 'binary'});
        const sheetNames = data.SheetNames;
        this.excelData = XLSX.utils.sheet_to_json(data.Sheets[sheetNames[0]]);

        this.excelData.forEach(consumer => {
          this.usersService
          .createConsumer(this.employerId, consumer)
          .subscribe((data) => {
            this.submitted = true;
            setTimeout(() => {
              this.submitted = false;
            }, 3000);
          });
        });
        
      }
    }
  }
}
