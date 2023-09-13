import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home-admin-shell',
  templateUrl: './home-admin-shell.component.html',
  styleUrls: ['./home-admin-shell.component.scss'],
})
export class HomeAdminShellComponent implements OnInit {
  colorEmployerBtn: boolean;
  colorClaimsBtn: boolean;

  public image: string = '../../../../../assets/images/home-page-image.png';
  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {


        if (e.url.includes('/admin/employers')) {
          this.colorEmployerBtn = true;
          this.colorClaimsBtn = false;
        } else if (e.url.includes('/admin/claims')) {
          this.colorClaimsBtn = true;
          this.colorEmployerBtn = false;
        }

      });

      route.url.subscribe(() => {
        const selected = route.snapshot.firstChild.routeConfig.path;
        if(selected.includes('employers')){
          this.colorEmployerBtn = true;
          this.colorClaimsBtn = false;
        }
        if(selected.includes('claims')){
          this.colorClaimsBtn = true;
          this.colorEmployerBtn = false;
        }
       });
  }

  ngOnInit(): void {}
}
