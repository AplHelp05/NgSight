import { ServerMessage } from './../shared/server-message';
import { Server } from './../shared/Server';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  

  constructor(private _http: HttpClient) { }

  errorHandler(error: any){
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  /*getServers(): Observable<Server[]>{
    return this._http.get('https://localhost:5001/api/server')
      .map(res => res.json())
      .catchError(this.errorHandler);
  }*/

  private _urlServer =  'https://localhost:5001/api/server';
  getServers(): Observable<Server[]>{
    return this._http.get<any>(this._urlServer).pipe(catchError(this.errorHandler));
  }
  private _urlServerMessage = 'https://localhost:5001/api/server';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
                  responseType: 'text' as 'json' };

  handleServerMessage(msg: ServerMessage): Observable<Response>{
    var url = this._urlServerMessage+'/'+ msg.id;
    return this._http.put<any>(url, msg, this.httpOptions).pipe(catchError(this.errorHandler));
  }
}
