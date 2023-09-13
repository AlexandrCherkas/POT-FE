import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IEmployerPermissions } from 'src/app/modules/employer-portal/interfaces/employerPermissions';
import { EmployerService } from 'src/app/modules/employer-portal/services/employer.service';
import { IConsumerPermissions } from '../../interfaces/consumerPermissions';
import { ConsumerServiceService } from '../../services/consumer-service.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {

  public consumerID: string;
  public displayedColumns: string[] = ['plan', 'type', 'election', 'contribution', 'availableAmount', 'action'];
  public dataSource;
  public activePackage = []
  public consumerPermissions: IConsumerPermissions;
  public employerPermissions: IEmployerPermissions;

  private componentActive: boolean = true

  constructor(
    private router: Router,
    private consumerService: ConsumerServiceService,
    private authService: AuthService,
    private modalWindow: ModalWindowService
    ) {
      this.consumerID = this.authService.getUserId()
    }

  ngOnInit(): void {
    this.consumerService.getConsumerById(this.consumerID)
      .subscribe(data => {
        this.consumerPermissions = data[0].permissions.canFillClaims;
        this.employerPermissions = data[0].employer.permissions.canFillClaims;
        this.dataSource = data[0].packages;
      })
  }

  addClaim(oneOfPackage: object): void {
    this.consumerService.setCurrentPackage(oneOfPackage)
    this.router.navigate(['consumer/claims/add'])
  }

  showError(): void{
    this.modalWindow.showPageDialog("You can't add a new Claim! Your rights have been restricted by Employer or Admin")
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}


