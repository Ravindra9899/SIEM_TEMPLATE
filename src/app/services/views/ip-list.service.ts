import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpListService {

  private requestBaseUri: string = "";

  constructor(private httpClient: HttpClient) {
    this.requestBaseUri = '/api/ipscan'
  }

  getMostRecentlyScannedIpList(): Observable<any> {
    let uri = this.requestBaseUri + "/recent-scanned-ips?readValidate=1";

    return this.httpClient.get(uri)
      .pipe(
        catchError((err) => {
          console.error("Error in read scan reports for ip and api date range service");
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              return throwError(() => new Error("You are not authorized to access this resource"));
            } else if (err.status === 404) {
              return throwError(() => new Error("The requested resource was not found"));
            } else if (err.status === 400) {
              return throwError(() => new Error("The server could not understand the request"));
            } else if (err.status === 500) {
              return throwError(() => new Error("An internal server error occurred"));
            } else {
              return throwError(() => new Error("An unknown HTTP error occurred"));
            }
          } else if (err.name === "TimeoutError") {
            return throwError(() => new Error("The server did not respond within the expected time"));
          } else if (err.name === "TypeError") {
            return throwError(() => new Error("There was a problem with the network connection"));
          } else {
            return throwError(() => new Error("An unknown error occurred"));
          }
        })
      );
  }


}
