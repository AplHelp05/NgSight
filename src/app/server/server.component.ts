import { ServerMessage } from './../shared/server-message';
import { Server } from './../shared/Server';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit {

  @Input() serverInput: Server;
  color: string;
  buttonText: string;
  isLoading: boolean;
  serverStatus: string;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  constructor() { }

  ngOnInit() {
    this.setServerAction(this.serverInput.isOnline);
  }

  setServerAction(isOnline: boolean){
    if(isOnline){
      this.serverInput.isOnline = true;
      this.color = '#FF6B6B';
      this.serverStatus = 'Online';
      this.buttonText = 'Shut Down';
    }else{
      this.serverInput.isOnline = false;
      this.color = '#66BB6A';
      this.serverStatus = 'Offline';
      this.buttonText = 'Start';
    }
  }

  toggleStatus(onlineStatus: boolean){
    this.setServerAction(!onlineStatus)
  }


  makeLoading(){
    this.color = '#FFCA28';
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }


  sendServerAction(isOnline: boolean){
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage{
    if(isOnline){
      return {
        id: this.serverInput.id,
        payload: 'deactivate'
      };
    }else{
      return {
        id: this.serverInput.id,
        payload: 'activate'
      };
    }
  }

}
