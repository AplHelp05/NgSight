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

  constructor(private _http: HttpClient) { }

  errorHandler(error: HttpErrorResponse){
    console.log(error.message +" "+ error.name )
    return throwError(error);
  }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
                  responseType: 'text' as 'json' };

  createNewCustomer(customer: Customer){
    console.log(customer);
    return this._http.post<any>(this._createCustomer, customer, this.httpOptions).pipe(catchError(this.errorHandler));
  }
  
}
