import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoginData } from '../interfaces/loginData';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { DecodedToken } from '../interfaces/decodedToken';

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public langSubj = new ReplaySubject<boolean>();
  public language: boolean;
  private uriseg = 'http://localhost:3000/api/users';
  private decodedToken: DecodedToken;

  constructor(private httpClient: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }

  public setLanguage(status: boolean): void {
    this.langSubj.next(status);
  }
  public getLanguage(): Observable<boolean> {
    return this.langSubj.asObservable();
  }

  public verificationUser(data: ILoginData): Observable<Object> {
    const URI = this.uriseg + '/login';
    return this.httpClient.post(URI, data).pipe(
      map((token: string) => {
        return this.saveToken(token);
      })
    );
  }

  private saveToken(token: string): Object {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  public getToken(): string{
    return localStorage.getItem('auth_tkn');
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public getUserName(): string {
    return this.decodedToken.username;
  }

  public getUserRole(): string {
    return this.decodedToken.userRole;
  }
  public getUserId(): string{
    return this.decodedToken.userId
  }

  public signOut(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    this.decodedToken = new DecodedToken();
  }

  public getUserImage(): string{
    const user = this.getUserRole()
    if(user == 'admin'){
      return '../../../../assets/images/admin-logo.png'
    } else{
      return ''
    }
  }
}
