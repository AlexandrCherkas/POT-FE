import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { IEmployer } from '../../../interfaces/employer';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-administration-page-menu',
  templateUrl: './administration-page-menu.component.html',
  styleUrls: ['./administration-page-menu.component.scss']
})
export class AdministrationPageMenuComponent implements OnInit {
  employer;

  private componentActive: boolean = true
  public id: string;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {
    this.route.paramMap
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(params => {
        this.id = params.get('id');
      });
  }

  ngOnInit(): void {
    this.adminService.getEmployerByID(this.id)
      .subscribe(data => {
        this.employer = data[0];
    });
  }

  goToHomePage() {
    this.router.navigate(['admin/employers']);
  }

  goToManageUsers() {
    this.router.navigate(['admin/employers/' + this.employer._id, 'employees/add']);
  }

  goToManagePlans(): void{
    this.router.navigate(['manage-plans']);
  }

}
