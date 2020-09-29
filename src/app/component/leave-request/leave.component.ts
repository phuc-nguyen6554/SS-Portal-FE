import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../Services/LeaveRequest/leave.service';
import { Router } from '@angular/router';
import {Leave} from '../../Models/Leave';
import { LeaveType } from '../../Models/LeaveType';
import {TypeService} from '../../Services/LeaveRequest/type.service';
import {MatRadioChange} from '@angular/material/radio';
import {MatSelectModule, MatSelect} from '@angular/material/select';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  leaves: Leave[];
  message: any;
  leaveType: number;
  LeaveType: LeaveType[];
  constructor(private leaveService: LeaveService, private router: Router, private typeService: TypeService) {}

  ngOnInit(): void {
    this.getAllLeave();
    this.getType();
    if (localStorage.getItem('flash_message') != null) {
      this.message = {type: 'success', message: localStorage.getItem('flash_message')};
      localStorage.removeItem('flash_message');
    }
  }
  getType(): void{
    this.typeService.getType()
      .subscribe(result => this.LeaveType = result);
  }

  getAllLeave(): void{
    this.leaveService.getAllLeave()
      .subscribe(result => {this.leaves = result; console.log(result); });
  }

  // tslint:disable-next-line:typedef
  onChangeDatesEvent(event: any){
    this.getFilterLeave({leaveDates: event.target.value});
  }

  // tslint:disable-next-line:typedef
  dropDownChange(event: any, type: any){
    console.log(event);
    switch(type){
      case 'leave-type':
        this.getFilterLeave({LeaveTypeId : event.target.value});
        break;
      case 'leave-time':  
        this.getFilterLeave({LeaveTime : event.target.value});
    }
  }

  getFilterLeave(obj): void{
    this.leaveService.getFilterLeave(obj)
      .subscribe(result => {this.leaves = result; console.log(result); 
        if(result.length == 0) {
          this.message = {type: 'danger', message: 'Record not found'};
        }
        else {
          this.message = '';
        }
      });
  }

  delete(id: number): void {
    this.leaveService.deleteBooking(id)
      .subscribe(result => {
        console.log(result.body);
        this.leaves = this.leaves.filter(value => {
          return value.id !== id;
        });
        this.message = {type: 'success', message: 'Delete Success'};
      },
      error => {
        this.message = {type: 'danger', message: error.error};
      },
      () => {}
      );
  }

  close(): void{
    this.message = null;
  }

}
