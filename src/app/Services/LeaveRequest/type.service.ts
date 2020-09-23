import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveType } from '../../Models/LeaveType';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  apiEndpoint = 'http://localhost:2000/leaves/leave-types/list';
  header: HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json')
     .set('Authorization', 'Bearer ' + localStorage.getItem('JWT_token'));
  }

  public getType(): Observable<LeaveType[]>{
    return this.http.get<LeaveType[]>(this.apiEndpoint, {headers: this.header});
  }

  createRoom(roomName: string): Observable<any>{
    return this.http.post(this.apiEndpoint, {RoomName: roomName}, {headers: this.header});
  }

  deleteRoom(id: number): Observable<any>{
    return this.http.delete(this.apiEndpoint + `/${id}`, {headers: this.header});
  }
}
