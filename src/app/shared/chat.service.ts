import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Message } from './data-structures';

@Injectable()
export class ChatService {
  private url = 'https://tictactoe-chat-server.herokuapp.com/';
  private socket;

  public sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  public getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (message: Message) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
