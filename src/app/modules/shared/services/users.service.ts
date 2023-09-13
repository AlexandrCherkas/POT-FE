import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/users';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  uploadLogoPath: string = 'file/upload';
  consumersPath: string = 'api/consumers/';
  employerPath: string = 'api/employers/';

  constructor(
    private http: HttpClient,
    private httpService: HttpServiceService
  ) {}

  getEmployer(id: string): Observable<any> {
    return this.httpService.get(this.employerPath + id);
  }

  updateEmployer(id: string, employer): Observable<any> {
    return this.httpService.patch(this.employerPath + id + '/update', employer);
  }

  uploadLogo(formData): Observable<any> {
    return this.httpService.post(this.uploadLogoPath, formData);
  }

  getConsumer(consumerId: string): Observable<any> {
    return this.httpService.get(this.consumersPath + consumerId);
  }

  createConsumer(employerId: string, consumer): Observable<any> {
    return this.httpService.post(
      this.consumersPath + employerId + '/add',
      consumer,
      employerId
    );
  }

  updateConsumer(consumerId: string, consumer): Observable<any> {
    return this.httpService.patch(
      this.consumersPath + consumerId + '/update',
      consumer
    );
  }

  postEmployer(employer): Observable<any> {
    return this.httpService.post(this.employerPath + 'add', employer);
  }
}
