import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { HttpServiceService } from '../../shared/services/http-service.service';
import { INewClaim } from '../interfaces/newClaim';

@Injectable({
  providedIn: 'root'
})
export class ConsumerServiceService {

  public currentPackage = new ReplaySubject()
  public currentPage = new ReplaySubject()

  constructor(
    private httpService: HttpServiceService
  ) { }

  public setCurrentPackage(oneOfPackage: object): void{
    this.currentPackage.next(oneOfPackage)
  }

  public getCurrentPackage(): Observable<any>{
    return this.currentPackage.asObservable()
  }

  public setCurrentPage(value: any): void{
    this.currentPage.next(value)
  }

  public getCurrentPage(): Observable<any>{
    return this.currentPage.asObservable()
  }

  public getConsumerById(consumerID: string): Observable<any>{
    const path: string = 'api/consumers/'
    return this.httpService.get(path + consumerID)
  }

  public getClaimByConsumer(consumer: string, page: number, size: number, sort: string, order: string): Observable<any> {
    if(sort){
      const path = `api/claims?consumer=${consumer}&page=${page}&size=${size}&sort=${sort}&order=${order}`;
      return this.httpService.get(path);
    } else {
      const path = `api/claims?consumer=${consumer}&page=${page}&size=${size}`;
      return this.httpService.get(path);
    }
  }

  public addClaim(consumerID: string, claim: INewClaim): Observable<any>{
    const path = `api/claims/${consumerID}/add`;
    const body = claim;
    return this.httpService.post(path, body);
  }

  public getPackageById(packageID: string): Observable<any>{
    const path = `api/packages/${packageID}`;
    return this.httpService.get(path);
  }

}
