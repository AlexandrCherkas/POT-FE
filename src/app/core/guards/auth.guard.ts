import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private url: string;
  constructor(private authService: AuthService, private router: Router) {}

  private authState(): boolean {
    if (this.isLogin()) {
      let userRole = this.authService.getUserRole()
      this.router.navigate([`/${userRole}`]);
      return false;
    }
    return true;
  }
  private notAuthState(): boolean {
    if (this.isLogin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  private isLogin(): boolean {
    if (this.url.includes('/login')) {
      return true;
    }
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.url = state.url;
    if (this.authService.isAuthenticated()) {
      return this.authState();
    }
    return this.notAuthState();
  }
}
