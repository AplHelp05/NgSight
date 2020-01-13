import { OrderService } from './../services/order-service.service';
import { Customer } from './../shared/Customer';
import { Order } from './../shared/Orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderData = {} as Order;
  customer = {} as Customer;
  customers: Customer [];
  cusHasError: boolean;
  selectedId: number;

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer(){
    this._orderService.getAllCustomers().subscribe(
      res => {
        this.customers = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  validCustomer(customer){
    if(customer === 'default'){
      this.cusHasError = true;
    }else{
      var id = customer.split("-")[0];
      this.selectedId = Number(id);
      this.cusHasError = false;
     
      return this.getSelectedCustomer(this.selectedId);
    }
  }

  getSelectedCustomer(id: number): any{
    this._orderService.selectedCustomer(id).subscribe(
      res => {
        this.customer = res;
        //console.log("from getSelectedCustomer - Customer",this.customer);
      },
      err => {
        console.log(err);
      }
    );
  }
  
  createOrder(){
    //console.log("From CreateOrder - ID",this.selectedId);
    //console.log("From CreateOrder - Customer",this.customer);
    var order = {} as Order;
    order = {
      id: this.orderData.id,
      customer: this.customer,
      total: this.orderData.total,
      placed: this.orderData.placed,
      completed: this.orderData.completed
    };
    this._orderService.createOrder(order).subscribe(
      res => {
        console.log("Successful From CreateOrder - Order",order);
      },
      err => {
        console.log(err);
      }
    );
  }

}