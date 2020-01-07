import { Server } from './../shared/Server';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit {

  @Input() serverInput: Server;
  color: string;
  buttonText: string;

  constructor() { }

  ngOnInit() {
    this.setServerAction(this.serverInput.isOnline);
  }

  setServerAction(isOnline: boolean){
    if(isOnline){
      this.serverInput.isOnline = true;
      this.color = '#FF6B6B';
      this.buttonText = 'Shut Down';
    }else{
      this.serverInput.isOnline = false;
      this.color = '#66BB6A';
      this.buttonText = 'Start';
    }
  }

  toggleStatus(onlineStatus: boolean){
    console.log(this.serverInput.name, ': ', onlineStatus);
    this.setServerAction(!onlineStatus)
  }

}
