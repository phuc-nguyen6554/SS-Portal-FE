import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../../Models/Booking';
import {config} from '../config';
import {RoomService} from '../Room/room.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  header: HttpHeaders;

  apiEndpoint = config.gateway + 'bookings/bookings';

  constructor(private http: HttpClient, private roomService: RoomService) {
    this.header = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json')
     .set('Authorization', 'Bearer ' + localStorage.getItem('JWT_token'));
  }

  getAllBooking(): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiEndpoint, {headers: this.header});
  }

  createBooking(booking: Booking): Observable<any>{
    return this.http.post<any>(this.apiEndpoint, booking, {headers: this.header, observe: 'response'});
  }

  updateBooking(booking: Booking): Observable<any>{
    return this.http.put(this.apiEndpoint + `/${booking.id}`, booking, {headers: this.header, observe: 'response'});
  }

  deleteBooking(id: number): Observable<any>{
    return this.http.delete(this.apiEndpoint + `/${id}`, {headers: this.header, observe: 'response'} );
  }
}
