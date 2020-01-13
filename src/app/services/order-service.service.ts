import { Customer } from './../shared/Customer';
import { Order } from './../shared/Orders';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _getAllCustomers = "https://localhost:5001/api/customer";
  private _getSelectedCustomer = "https://localhost:5001/api/customer";
  private _createOrder = "https://localhost:5001/api/order/newOrder";



  constructor(private _http: HttpClient) { }

  errorHandler(error: HttpErrorResponse){
    console.log(error.message +" "+ error.name )
    return throwError(error);
  }

  getAllCustomers(){
    return this._http.get<any>(this._getAllCustomers).pipe(catchError(this.errorHandler));
  }

  selectedCustomer(id: number): Observable<Customer>{
    var url = this._getSelectedCustomer+'/'+id;
    return this._http.get<any>(url).pipe(catchError(this.errorHandler));
  }

  createOrder(order: Order){
    console.log("from createOrder", order);
    return this._http.post<any>(this._createOrder, order).pipe(catchError(this.errorHandler));
  }
}
