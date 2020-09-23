import { Injectable } from '@angular/core';
import { Message } from '../../Models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: Message[] = [];

  constructor() { }

  add(message: Message): void{
    // Give it an id
    message.id = this.messages.length + 1;
    this.messages.push(message);
  }

  delete(message: Message): void{
    this.messages = this.messages.filter(value => {
      return value.id !== message.id;
    });
  }

  clearAll(): void{
    this.messages = [];
  }
}
