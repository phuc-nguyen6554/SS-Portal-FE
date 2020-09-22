import { Injectable } from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean{
    if (!this.authService.ValidateJWT()){
      this.router.navigate(['/login']);
      return false;
    }else{
      return true;
    }

  }
}
