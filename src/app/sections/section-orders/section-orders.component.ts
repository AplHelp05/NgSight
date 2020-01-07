import { SalesDataService } from './../../services/salesdata.service';
import { Order } from './../../shared/Orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor(private _salesData: SalesDataService) { }

  orders: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this._salesData.getOrders(this.page, this.limit).subscribe(
      res => {
        console.log(res['page']['data']);
        this.orders = res['page']['data'];
        this.total = res['page'].total;
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  goToPrevious(): void{
    this.page--;
    this.getOrders();
  }

  goToNext(): void{
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void{
    this.page = n;
    this.getOrders();
  }

}
