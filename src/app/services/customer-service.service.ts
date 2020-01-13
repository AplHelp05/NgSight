import { Customer } from './../shared/Customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _createCustomer = 'https://localhost:5001/api/customer/newCustomer';
  private _getListCustomer = 'https://localhost:5001/api/customer';


  constructor(private _http: HttpClient) { }

  errorHandler(error: HttpErrorResponse){
    console.log(error.message +" "+ error.name )
    return throwError(error);
  }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
                  responseType: 'text' as 'json' };

  createNewCustomer(customer: Customer){
    return this._http.post<any>(this._createCustomer, customer, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getListCustomers(page: number, limit: number){
    var url = this._getListCustomer+'/'+page+'/'+limit;
    return this._http.get<any>(url).pipe(catchError(this.errorHandler));
  }
  
}
