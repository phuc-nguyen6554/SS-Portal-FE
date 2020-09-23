import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ClaimTypes} from '../../Const/ClaimTypes';
import {User} from '../../Models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit{
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public User: User;

  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit() {
    const jwt_decode = this.jwtHelper.decodeToken();
    this.User = {
      Name: jwt_decode[ClaimTypes.Name],
      Email: jwt_decode[ClaimTypes.Email],
      Avatar: jwt_decode[ClaimTypes.Avatar],
      Role: jwt_decode[ClaimTypes.Role]
    };
  }
}
