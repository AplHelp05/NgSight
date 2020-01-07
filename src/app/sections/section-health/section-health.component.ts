import { Server } from './../../shared/Server';
import { Component, OnInit } from '@angular/core';

const SAMPLE_SERVERS = [
  {id: 1, name: "Dev", isOnline: true},
  {id: 2, name: "Prod-Web", isOnline: true},
  {id: 3, name: "Dev-Web", isOnline: true},
  {id: 4, name: "Dev-Mail", isOnline: false}
];

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit {

  Servers: Server[] = SAMPLE_SERVERS;
  constructor() { }

  ngOnInit() {
  }

}
