import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  href = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  private getUrl(path: string, params?: string): string{
    return params?
      this.href + path + params :
      this.href + path
  }

  get(path: string, params?: string): Observable<any>{
    const fullPath = this.getUrl(path, params)
    return this.http.get(fullPath)
  }


  post(path: string, body: object, id?: string): Observable<any>{
    const fullPath = this.getUrl(path);
    return this.http.post(fullPath, body, {responseType: 'text'});
  }

  delete(path: string, params?: string | any): Observable<any>{
    const fullPath = this.getUrl(path)
    return this.http.delete(fullPath + params)
  }

  patch(path: string, body?:any, params?: any): Observable<any>{
    const fullPath = this.getUrl(path, params)
    return this.http.patch(fullPath, body)
  }


}
