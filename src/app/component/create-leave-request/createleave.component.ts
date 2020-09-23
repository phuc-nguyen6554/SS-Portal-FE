import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LeaveService } from '../../Services/LeaveRequest/leave.service';
import { TypeService } from '../../Services/LeaveRequest/type.service';
import { LeaveType } from '../../Models/LeaveType';
import { Router } from '@angular/router';
import { MessageService } from '../../Services/Message/message.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-create-leave-request',
  templateUrl: './createleave.component.html',
  styleUrls: ['./createleave.component.css']
})
export class CreateLeaveRequestComponent implements OnInit {
  leaveDateNums = [Math.random()];
  leaveDates: string[] = [];
  isSelectLeaveDate: boolean;
  leaveName: string;
  leaveDate: string;
  leaveReason: string;
  leaveTime: number;
  leaveType: number;
  LeaveType: LeaveType[];
  constructor(private leaveService: LeaveService, private typeService: TypeService, private ref: ElementRef, private router: Router,
              private messageService: MessageService) { }

  // tslint:disable-next-line:typedef
  onChangeDatesEvent(event: any, index){
    this.isSelectLeaveDate = true;
    this.leaveDates[index] = event.target.value;
  }

  ngOnInit(): void {
    this.isSelectLeaveDate = false;
    this.getType();
    this.setInputWidth();
  }

  getType(): void{
    this.typeService.getType()
      .subscribe(result => this.LeaveType = result);
  }

  setInputWidth(): void{
    const dpDatePicker = this.ref.nativeElement.querySelectorAll('mat-form-field');
    for (const item of dpDatePicker){
      item.style.width = '45%';
    }
  }
  // tslint:disable-next-line:typedef
  addLeaveDate() {
    // tslint:disable-next-line:no-unused-expression
    this.leaveDateNums.push(Math.random());
    console.log(this.leaveDateNums);
  }
  // tslint:disable-next-line:typedef
  removeLeaveDate(item) {
    this.leaveDateNums.splice(this.leaveDateNums.indexOf(item));
    console.log(this.leaveDateNums);
  }
  CreatLeave(): void{
    console.log(this.leaveDates);
    this.messageService.clearAll();
    if (this.Validate()) {
      // tslint:disable-next-line:max-line-length
      const objPut = {name: this.leaveName, LeaveDates: this.leaveDates, LeaveTime: this.leaveTime, LeaveTypeId: this.leaveType, Reason: this.leaveReason};
      console.log(objPut);
      // @ts-ignore
      this.leaveService.createLeave(objPut)
      .subscribe(result => {
        localStorage.setItem('flash_message', 'Leave Request Created');
        this.router.navigate(['/leave-request']);
      },
      error => {this.messageService.add({type: 'danger', content: error.error}); });
    }
  }

  private Validate(): boolean{
    let isValid = true;

    if (this.leaveName == null){
      this.messageService.add({type: 'danger', content: 'Please Enter Leave Name'});
      isValid = false;
    }

    if (this.leaveReason == null){
      this.messageService.add({type: 'danger', content: 'Please Enter Reason'});
      isValid = false;
    }

    if (this.isSelectLeaveDate === false) {
      this.messageService.add({type: 'danger', content: 'Please Select Leave Date'});
      isValid = false;
    }

    // check duplicate date
    if ((new Set(this.leaveDates)).size !== this.leaveDates.length) {
      this.messageService.add({type: 'danger', content: 'Leave Date is duplicate'});
      isValid = false;
    }

    if (this.leaveTime == null) {
      this.messageService.add({type: 'danger', content: 'Please Select Leave Time'});
      isValid = false;
    }

    if (this.leaveType == null) {
      this.messageService.add({type: 'danger', content: 'Please Select Leave Type'});
      isValid = false;
    }


    return isValid;
  }

}
