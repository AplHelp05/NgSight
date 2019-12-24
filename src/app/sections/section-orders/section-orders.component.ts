import { Order } from './../../shared/Orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  public  Orders: Order[] = [
    {
      id: 1, 
      customer:{id:1, name:'Main St Bakery', email: 'mainst@bakery.com', state:'CO'},
      total: 230,
      orderPlaced: new Date(2017,12,3),
      orderFulfilled: new Date(2017,12,3)
    },
    {
      id: 3, 
      customer:{id:1, name:'Main St Bakery', email: 'mainst@bakery.com', state:'CO'},
      total: 230,
      orderPlaced: new Date(2017,12,3),
      orderFulfilled: new Date(2017,12,3)
    },
    {
      id: 2, 
      customer:{id:1, name:'Main St Bakery', email: 'mainst@bakery.com', state:'CO'},
      total: 230,
      orderPlaced: new Date(2017,12,3),
      orderFulfilled: new Date(2017,12,3)
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
