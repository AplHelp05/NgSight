import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {
  private _getOrders = "https://localhost:5001/api/order";

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

  getAllOrders(){
    return this._http.get<any>(this._getOrders).pipe(catchError(this.errorHandler));
  }

}
