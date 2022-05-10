import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  // REST_SERVER_URL = InfoJson["REST_SERVER"]
  REST_SERVER_URL = "http://52.78.240.74:9090/"
  private headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET'
      }
    );
  }

  getAirlineEvent(payload: any) {
    return this.http.put(this.REST_SERVER_URL + 'airlineEvent/', payload, { observe: 'response', headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
