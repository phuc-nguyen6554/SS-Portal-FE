import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
//declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit{
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public Avatar = '';

  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit() {
    const jwt_decode = this.jwtHelper.decodeToken();
    this.Avatar = jwt_decode['Avatar'];
  }
}
