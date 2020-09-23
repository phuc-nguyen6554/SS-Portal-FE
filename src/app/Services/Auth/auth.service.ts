import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtService: JwtHelperService) { }

  ValidateJWT(): boolean {
    if (this.jwtService.tokenGetter() !== 'Invalid') {
      return !this.jwtService.isTokenExpired();
    }
    return false;
  }
}
