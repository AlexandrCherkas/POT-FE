import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { UsersService } from 'src/app/modules/shared/services/users.service';

@Component({
  selector: 'app-add-employee-shell',
  templateUrl: './add-employee-shell.component.html',
  styleUrls: ['./add-employee-shell.component.scss'],
})
export class AddEmployeeShellComponent implements OnInit {

  public newConsumerMessage = "add-new-consumer"
  public errorAddConsumer = "main-error"
  employerId: string;
  employeeFormGroup: any;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private modalWindow: ModalWindowService
  ) {
    this.route.parent.params.subscribe((params) => {
      this.employerId = params['id'];
    });
  }

  ngOnInit(): void {}

  onEmployeeFormGroupInit(employeeFormGroup): void {
    this.employeeFormGroup = employeeFormGroup;
  }

  addNewEmployee(data: any): void {
    this.usersService.createConsumer(this.employerId, data)
      .subscribe((res) => {
        if(res){
          const fullName = `${data?.firstName} ${data?.lastName}`
          this.modalWindow.showPageDialog(`You added new consumer: ${fullName}`)
        } else{
          this.modalWindow.showPageDialog(`${this.errorAddConsumer}`)
        }
        this.employeeFormGroup.reset();
      });
  }
}
