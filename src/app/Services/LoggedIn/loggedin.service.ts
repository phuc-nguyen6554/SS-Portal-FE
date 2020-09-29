import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): boolean {
    if(this.authService.ValidateJWT()){
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
