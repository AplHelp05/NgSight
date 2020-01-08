import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {
  private _getOrders = "https://localhost:5001/api/order";
  private _getOrderByCustomer = "https://localhost:5001/api/order/bycustomer";
  private _getOrderByState = "https://localhost:5001/api/order/bystate";


  constructor(private _http: HttpClient) { }
  errorHandler(error: HttpErrorResponse){
    console.log(error.message +" "+ error.name )
    return throwError(error);
  }

  getOrders(page, limit){
    var link = this._getOrders+"/"+page+"/"+limit;
    console.log(link);
    return this._http.get<any>(link).pipe(catchError(this.errorHandler));
  }

  getOrdersByCustomer(n: number){
    var link = this._getOrderByCustomer+"/"+n
    return this._http.get<any>(link).pipe(catchError(this.errorHandler));
  }

  getOrdersByState(){
    return this._http.get<any>(this._getOrderByState).pipe(catchError(this.errorHandler));
  }

}
