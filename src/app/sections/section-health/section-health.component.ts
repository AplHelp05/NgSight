import { ServerMessage } from './../../shared/server-message';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { ServerService } from './../../services/server.service';
import { Server } from './../../shared/Server';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit, OnDestroy {

  Servers: Server[];

  timerSubscribtion: AnonymousSubscription;
  constructor(private _serverService: ServerService) { }

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy(): void {
    if(this.timerSubscribtion){
      this.timerSubscribtion.unsubscribe();
    }
  }

  refreshData(){
    this._serverService.getServers().subscribe(
      res => {
        this.Servers = res;
      },
      err => { console.log(err); }
    );
    this.subscribeToData();
  }

  subscribeToData(){
    this.timerSubscribtion = Observable.timer(5000).first().subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage){
    this._serverService.handleServerMessage(msg).subscribe(
      res => {
        console.log(msg);
      },
      err => {
        console.log(err);
      }
      );
  }

}
