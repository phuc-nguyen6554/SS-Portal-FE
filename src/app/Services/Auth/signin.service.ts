import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json');

  login(token: string): Observable<any>{
    const url = config.gateway + 'login';
    return this.http.post<any>(url, `'${token}'`, {headers: this.headers});
  }
}
