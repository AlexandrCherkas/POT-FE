import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public language: boolean;
  public hide = true;
  private componentActive = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    public translateService: TranslateService) {}

  ngOnInit(): void {
    this.authService.getLanguage()
      .pipe(takeWhile( () => this.componentActive))
      .subscribe(
        lang => {this.language = lang}
      )
  }

  logOut(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  changeLanguage(): void {
    if(!this.language){
      this.translateService.use('fr-FR')
      this.authService.setLanguage(true)
    } else{
      this.translateService.use('en-US')
      this.authService.setLanguage(false)
  }
}

}
