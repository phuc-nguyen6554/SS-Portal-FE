import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../Models/Room';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiEndpoint = config.gateway + 'bookings/rooms';
  header: HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json')
     .set('Authorization', 'Bearer ' + localStorage.getItem('JWT_token'));
  }

  public getRoom(): Observable<Room[]>{
    return this.http.get<Room[]>(this.apiEndpoint, {headers: this.header});
  }

  createRoom(roomName: string): Observable<any>{
    return this.http.post(this.apiEndpoint, {RoomName: roomName}, {headers: this.header});
  }

  deleteRoom(id: number): Observable<any>{
    return this.http.delete(this.apiEndpoint + `/${id}`, {headers: this.header});
  }
}
