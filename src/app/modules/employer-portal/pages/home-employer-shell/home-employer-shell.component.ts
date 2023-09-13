import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, takeWhile, startWith, delay } from 'rxjs';
import { AdminService } from 'src/app/modules/admin-portal/services/admin.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UsersService } from 'src/app/modules/shared/services/users.service';

@Component({
  selector: 'app-home-employer-shell',
  templateUrl: './home-employer-shell.component.html',
  styleUrls: ['./home-employer-shell.component.scss'],
})
export class HomeEmployerShellComponent implements OnInit {
  employerId: string = this.authService.getUserId();
  employer$: Observable<any> | undefined;
  homeTitle: string;
  public selected: string;
  public image: string = '../../../../../assets/images/home-page-image.png';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.employer$ = this.usersService.getEmployer(this.employerId);

    this.employer$.subscribe((employer) => {
      this.homeTitle = `${employer[0].companyName} (${employer[0].countryCode})`;
    });

    route.url.subscribe(() => {
      if(route.snapshot.firstChild.routeConfig.path.includes('employees')){
        this.selected = 'employees'
        } else{
      this.selected = route.snapshot.firstChild.routeConfig.path;
     }
    });

  }

  ngOnInit(): void {
  }
}
