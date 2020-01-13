import { CustomerService } from './../services/customer-service.service';
import { Customer } from './../shared/Customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  constructor(private _customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  goToPrevious(): void{
    this.page--;
    this.getCustomers();
  }

  goToNext(): void{
    this.page++;
    this.getCustomers();
  }

  goToPage(n: number): void{
    this.page = n;
    this.getCustomers();
  }

  getCustomers() {
    this._customerService.getListCustomers(this.page, this.limit).subscribe(
      res => {
        console.log(res['page']['data']);
        this.customers = res['page']['data'];
        this.total = res['page'].total;
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

}
