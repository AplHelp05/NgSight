import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {
  private _getOrders = "http://localhost:5000/api/orders";


  constructor(private _http: HttpClient) { }
  errorHandler(error: HttpErrorResponse){
    console.log(error.message +" "+ error.name )
    return throwError(error);
  }

  getOrders(page, limit){
    var link = this._getOrders+'/'+page+'/'+limit;
    return this._http.get<any>(link).pipe(catchError(this.errorHandler));
  }

}
