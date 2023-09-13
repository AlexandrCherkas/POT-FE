import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { HttpServiceService } from '../../shared/services/http-service.service';
import { IConsumerPackage} from '../interfaces/consumerPackage';
import { ISearchEmployee } from '../interfaces/searchEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private searchConsumersPath = 'api/consumers'
  private addPackagesPath = 'api/packages/'

  public changeTableEnrollment = new ReplaySubject();

  constructor(
    private httpService: HttpServiceService,
    private authService: AuthService
    ) { }

  public setChangeTableEnrollment(data: boolean){
    this.changeTableEnrollment.next(data)
  }

  public getChangeTableEnrollment(): Observable<any>{
    return this.changeTableEnrollment.asObservable()
  }

  public searchConsumers(searchData: ISearchEmployee, page: number, size: number, sort?: string, order?: string): Observable<any> {
    const consumerId = this.authService.getUserId();
    if (sort) {
      if(searchData){
        const params = `?employerId=${consumerId}&firstName=${searchData.firstName}&lastName=${searchData.lastName}&ssn=${searchData.ssn}&page=${page}&size=${size}&sort=${sort}&order=${order}`
        return this.httpService.get(this.searchConsumersPath, params)
      } else{
        const params = `?employerId=${consumerId}&firstName=&lastName=&ssn=&page=${page}&size=${size}&sort=${sort}&order=${order}`
        return this.httpService.get(this.searchConsumersPath, params)
      }
    } else {
      if(searchData){
        const params = `?employerId=${consumerId}&firstName=${searchData.firstName}&lastName=${searchData.lastName}&ssn=${searchData.ssn}&page=${page}&size=${size}`
        return this.httpService.get(this.searchConsumersPath, params)
      } else{
        const params = `?employerId=${consumerId}&firstName=&lastName=&ssn=&page=${page}&size=${size}`
        return this.httpService.get(this.searchConsumersPath, params)
      }
  }
  }

  public getConsumerByID(consumerID: string): Observable<any>{
    return this.httpService.get(this.searchConsumersPath + '/' + consumerID)
  }

  public addPackageToConsumer(consumerID: string, plan: IConsumerPackage ): Observable<any>{
    const path: string = this.addPackagesPath + consumerID + '/add';
    const body = plan
    return this.httpService.patch(path, body)
  }

  public deleteConsumer(employerID: string, consumerID:string): Observable<any>{
    const path: string = 'api/consumers/'
    const params: string = employerID + '/delete/' + consumerID
    return this.httpService.delete(path, params)
  }

  public getPackageByID(packageID: string): Observable<any>{
    const path: string = 'api/packages/'
    return this.httpService.get(path + packageID)
  }

  public updatePackage(packageID: string, election: number, consumerID?: string): Observable<any>{
    const path: string = 'api/packages/' + packageID + "/update"
    const body = {
      consumerId: consumerID,
      election: election
    }
    return this.httpService.patch(path, body)
  }

  public getEmployerByID(employeeID: string): Observable<any> {
    const path: string = `api/employers/${employeeID}`
    return this.httpService.get(path)
  }
}
