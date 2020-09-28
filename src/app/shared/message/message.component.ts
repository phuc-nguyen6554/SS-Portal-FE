import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../Services/Message/message.service';
import { Message } from '../../Models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

  close(message: Message): void {
    this.messageService.delete(message);
  }

}
