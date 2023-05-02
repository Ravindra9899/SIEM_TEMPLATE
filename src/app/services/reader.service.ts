import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private url = '/api/ipscan/';

  constructor(private httpClient: HttpClient) { }

  errorPipe(err: any): Observable<{ message: string; infoText: string; status: any; }> {
    if (typeof err == 'object' && err.hasOwnProperty('status') && err['status'] != null) {

      switch (err.status) {
        case 401: return of({
          message: 'error',
          infoText: 'unauthorized',
          status: 401
        });
        case 500: return of({
          message: 'error',
          infoText: 'ISE',
          status: 500
        });
        case 404: return of({
          message: 'error',
          infoText: 'not found',
          status: 404
        });
        case 400: return of({
          message: 'error',
          infoText: 'Bad Request',
          status: 404
        });
        default: return of({
          message: 'error',
          infoText: 'unknown error',
          status: err.status
        });
      }
    } else {
      return of({
        message: 'error',
        infoText: 'Service Unavailable',
        status: 503
      });
    }
  }

  apiCallToGetSingleViewAsn(ipAddress: string): Observable<any> {

    const requestUri = this.url + `/single-view-asn?ipAddress=${ipAddress}`;

    return this.httpClient.get(requestUri).pipe(
      catchError(
        (err) => {
          console.error("error in single view report read ", err);
          return this.errorPipe(err);
        }
      )
    );
  }

  apiCallToGetThreatScore(ipAddress: string): Observable<any> {

    const requestUri = this.url + 'test-calculate?permit=1&ipAddress=' + ipAddress;

    return this.httpClient.get(requestUri).pipe(
      catchError(
        (err) => {
          console.error("error in threat score read ", err);
          return of([]);
        }
      )
    );
  }

  apiCallToGetPrePrintScanReports(ipAddress: string): Observable<any> {
    const requestUri = this.url + 'single-view-print?ipAddress=' + ipAddress;

    console.log(requestUri);

    return this.httpClient.get(requestUri).pipe(
      catchError((err) => {
        console.error('Error in single-view-print', err);
        return of([]);
      })
    );
  }

  apiCallToPrintScanReport(ipAddress: string): Observable<Blob> {
    let requestUri = this.url + 'pdf';

    let data = {
      'ipAddress': ipAddress
    };

    console.log(data);

    return this.httpClient.post(
      requestUri,
      data,
      { responseType: 'blob' }
    )
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return of(
            new Blob
          );
        })
      )
      ;
  }
}
