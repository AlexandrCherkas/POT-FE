import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { UsersService } from 'src/app/modules/shared/services/users.service';

@Component({
  selector: 'app-add-employer-shell',
  templateUrl: './add-employer-shell.component.html',
  styleUrls: ['./add-employer-shell.component.scss'],
})
export class AddEmployerShellComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private modalWindow: ModalWindowService) {}

  ngOnInit(): void {}

  addNewEmployer(data: object): void {

    if (data[1]) {
      const uploadStatus = this.usersService.uploadLogo(data[1]).subscribe();
    }

    const registerStatus = this.usersService
      .postEmployer(data[0])
      .subscribe(() => {
        this.router.navigate(['admin/employers']);
        setTimeout( () => {this.modalWindow.showPageDialog(`You added new employer: ${data[0].companyName}`)}, 1000)
      });
  }

}
