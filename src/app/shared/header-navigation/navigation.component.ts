import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ClaimTypes} from '../../Const/ClaimTypes';
import {User} from '../../Models/User';
import {SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit{
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public User: User;

  constructor(private jwtHelper: JwtHelperService, private authService: SocialAuthService, private router: Router) {}

  ngOnInit() {
    const jwt_decode = this.jwtHelper.decodeToken();
    this.User = {
      Name: jwt_decode[ClaimTypes.Name],
      Email: jwt_decode[ClaimTypes.Email],
      Avatar: jwt_decode[ClaimTypes.Avatar],
      Role: jwt_decode[ClaimTypes.Role]
    };
  }

  signOut(): void {
    localStorage.removeItem('JWT_token');

    this.authService.signOut()
      .then((result) => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });

      this.router.navigate(['/login']);
  }
}
