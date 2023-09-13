import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ConsumerServiceService } from '../../services/consumer-service.service';
@Component({
  selector: 'app-home-consumer-shell',
  templateUrl: './home-consumer-shell.component.html',
  styleUrls: ['./home-consumer-shell.component.scss']
})
export class HomeConsumerShellComponent implements OnInit {

  public homeImage: string = "../../../../../assets/images/home-page-image.png"
  public consumerId: string;
  public selected = { select: '' };
  public firstName: string;
  public lastName: string;

  private componentActive: boolean = true

  constructor(
    private authService: AuthService,
    private consumerService: ConsumerServiceService,
    private route: ActivatedRoute,
    private router : Router
  ) {

    this.consumerId = this.authService.getUserId();

    route.url
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => {
        if(route.snapshot.firstChild.routeConfig.path.includes('claims')){
          this.selected.select = 'claims'
        }else{
          this.selected.select = route.snapshot.firstChild.routeConfig.path;
        }
      });

    this.consumerService.getCurrentPage()
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(data => {
        this.selected = data
      })
  }

  ngOnInit(): void {
        this.consumerService.getConsumerById(this.consumerId)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(data => {
        this.firstName = data[0].firstName;
        this.lastName = data[0].lastName
      })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
