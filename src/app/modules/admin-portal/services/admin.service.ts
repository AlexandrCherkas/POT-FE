import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import {
  AsyncSubject,
  BehaviorSubject,
  delay,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { ISearchEmployer } from '../interfaces/searchEmployer';
import { ISearchClaim } from '../interfaces/searchClaim';
import { HttpServiceService } from '../../shared/services/http-service.service';
import { IClaim } from '../interfaces/claim';
import { IEmployer } from '../interfaces/employer';
import { IPlan } from '../interfaces/plan';
import { NumberSymbol } from '@angular/common';
import { ISearchEmployee } from '../../employer-portal/interfaces/searchEmployee';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private workPackageSubj = new BehaviorSubject('');
  public nameUpdateEmployer: string;

  searchEmployersPath: string = 'api/employers';
  searchConsumersPath: string = 'api/consumers';

  getClaimsPath: string = 'api/claims/all';
  getClaimByIdPath: string = 'api/claims/';

  getEmployerByIdPath: string = 'api/employers/';
  getAllPackagesByIdPath: string = 'api/employers/';
  setPackageToEmployerPath: string = 'api/employers/';
  getEmployersPath: string = 'api/employers/all';
  deleteEmployerByIdPath: string = 'api/employers/delete/';

  getPackageByIdPath: string = 'api/packages/';
  getAllPackagesPath: string = 'api/packages/all';
  employersPath: string = 'api/employers/';

  getClaimByPath: string = 'api/claims/';
  consumersPath: string = 'api/consumers/';
  uploadLogoPath: string = 'file/upload';
  getLogoPath: string = 'file/';

  constructor(private httpService: HttpServiceService) {}

  uploadLogo(formData) {
    return this.httpService.post(this.uploadLogoPath, formData);
  }

  setSelectedEmployer(employer) {
    localStorage.setItem('selectedEmployer', JSON.stringify(employer));
  }

  getSelectedEmployer() {
    return JSON.parse(localStorage.getItem('selectedEmployer'));
  }

  removeSelectedEmployer() {
    localStorage.removeItem('selectedEmployer');
  }

  createConsumer(employerId: string, consumer) {
    return this.httpService.post(
      this.consumersPath + employerId + '/add',
      consumer,
      employerId
    );
  }

  getConsumersByEmployerId(id: string, page: number, index: number) {
    const params: string = `?&page=${page}&num=${index}`;
    return this.httpService.get(this.consumersPath + id, '/all' + params);
  }

  searchEmployer(
    searchData: ISearchEmployer,
    page: number,
    size: number,
    sort?: string,
    order?: string
  ): Observable<any> {
    if (sort) {
      if (!searchData) {
        const params = `?&page=${page}&size=${size}&sort=${sort}&order=${order}`;
        return this.httpService.get(this.searchEmployersPath, params);
      } else {
        const params = `?companyName=${searchData.companyName}&countryCode=${searchData.countryCode}&page=${page}&size=${size}&sort=${sort}&order=${order}`;
        return this.httpService.get(this.searchEmployersPath, params);
      }
    } else {
      if (!searchData) {
        const params = `?&page=${page}&size=${size}`;
        return this.httpService.get(this.searchEmployersPath, params);
      } else {
        const params = `?companyName=${searchData.companyName}&countryCode=${searchData.countryCode}&page=${page}&size=${size}`;
        return this.httpService.get(this.searchEmployersPath, params);
      }
    }
  }

  updateEmployer(id: any, data: any): Observable<any> {
    return this.httpService.patch(this.employersPath + id + '/update', data);
  }

  getAllEmployers(): Observable<any> {
    const path = 'api/employers/';
    return this.httpService.get(path);
  }

  searchClaim(
    searchData: ISearchClaim,
    page: number,
    size: number,
    sort?: string,
    order?: string
  ): Observable<any> {
    if (sort) {
      if (!searchData) {
        const params = `?&page=${page}&size=${size}&sort=${sort}&order=${order}`;
        return this.httpService.get(this.getClaimByIdPath, params);
      } else if (searchData.status) {
        const params = `?claimNumber=${searchData.claimNumber}&employer=${searchData.employer}&status=${searchData.status}&page=${page}&size=${size}&sort=${sort}&order=${order}`;
        return this.httpService.get(this.getClaimByIdPath, params);
      } else {
        const params = `?claimNumber=${searchData.claimNumber}&employer=${searchData.employer}&status=&page=${page}&size=${size}&sort=${sort}&order=${order}`;
        return this.httpService.get(this.getClaimByIdPath, params);
      }
    } else {
      if (!searchData) {
        const params = `?&page=${page}&size=${size}`;
        return this.httpService.get(this.getClaimByIdPath, params);
      } else if (searchData.status) {
        const params = `?claimNumber=${searchData.claimNumber}&employer=${searchData.employer}&status=${searchData.status}&page=${page}&size=${size}`;
        return this.httpService.get(this.getClaimByIdPath, params);
      } else {
        const params = `?claimNumber=${searchData.claimNumber}&employer=${searchData.employer}&status=&page=${page}&size=${size}`;
        return this.httpService.get(this.getClaimByIdPath, params);
      }
    }
  }

  getClaimByID(claimID: string): Observable<IClaim> {
    const params: string = claimID;
    return this.httpService.get(this.getClaimByIdPath, params);
  }

  updateClaimByID(claimID: string, claim: IClaim): Observable<IClaim> {
    const path: string = this.getClaimByPath + claimID + '/update';
    const body: IClaim = claim;
    return this.httpService.patch(path, body);
  }

  getPackages(): Observable<any> {
    return this.httpService.get(this.getAllPackagesPath);
  }

  getEmployerByID(employerID: string): Observable<IEmployer> {
    const params: string = employerID;
    return this.httpService.get(this.getEmployerByIdPath, params);
  }

  getEmployerPlans(employerID: string): Observable<any> {
    const path: string = '/plans';
    const params: string = employerID + path;
    return this.httpService.get(this.getAllPackagesByIdPath, params);
  }

  getPackagesByID(packageID: string): Observable<any> {
    const params: string = packageID;
    return this.httpService.get(this.getPackageByIdPath, params);
  }

  getPlanFromEmployerByID(employerID: string, packageID): Observable<any> {
    const path = 'api/employers/' + employerID + '/plans/' + packageID;
    return this.httpService.get(path);
  }

  updatePlan(
    employerID: string,
    packageID: string,
    plan: IPlan
  ): Observable<any> {
    const path: string =
      this.getEmployerByIdPath + employerID + '/plans/' + packageID + '/update';
    const body: IPlan = plan;
    return this.httpService.patch(path, body);
  }

  deleteEmployerByID(employerID: string): Observable<any> {
    const params: string = employerID;
    return this.httpService.delete(this.deleteEmployerByIdPath, params);
  }

  deletePlanFromEmployer(
    employerID: string,
    packageID: string
  ): Observable<any> {
    const path: string =
      this.getEmployerByIdPath + employerID + '/removePlan/' + packageID;
    return this.httpService.patch(path);
  }

  setPlanEmployer(employerID: string, plan: IPlan): Observable<any> {
    const path = 'api/plans/' + employerID + '/addPlan';
    const body = plan;
    return this.httpService.patch(path, body);
  }

  setWorkPackage(plan): void {
    this.workPackageSubj.next(plan);
  }

  getWorkPackage(): Observable<any> {
    return this.workPackageSubj.asObservable();
  }

  setNameUpdateEmployer(name: string): void {
    if (name) {
      this.nameUpdateEmployer = name;
    } else this.nameUpdateEmployer = '';
  }

  public searchConsumers(
    employerId: string,
    searchData: ISearchEmployee,
    page: number,
    size: number,
    sort?: string,
    order?: string
  ): Observable<any> {
    if (sort) {
      if (searchData) {
        const params = `?employerId=${employerId}&firstName=${searchData.firstName}&lastName=${searchData.lastName}&ssn=${searchData.ssn}&page=${page}&size=${size}&sort=${sort}&order=${order}`;
        return this.httpService.get(this.searchConsumersPath, params);
      } else {
        const params = `?employerId=${employerId}&firstName=&lastName=&ssn=&page=${page}&size=${size}&sort=${sort}&order=${order}`;
        return this.httpService.get(this.searchConsumersPath, params);
      }
    } else {
      if (searchData) {
        const params = `?employerId=${employerId}&firstName=${searchData.firstName}&lastName=${searchData.lastName}&ssn=${searchData.ssn}&page=${page}&size=${size}`;
        return this.httpService.get(this.searchConsumersPath, params);
      } else {
        const params = `?employerId=${employerId}&firstName=&lastName=&ssn=&page=${page}&size=${size}`;
        return this.httpService.get(this.searchConsumersPath, params);
      }
    }
  }

  public deleteConsumer(employerID: string, consumerID: string): Observable<any> {
    const path: string = 'api/consumers/';
    const params: string = employerID + '/delete/' + consumerID;
    return this.httpService.delete(path, params);
  }
}
