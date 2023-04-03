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

  apiCallToGetSingleViewAsn(ipAddress: string): Observable<any> {

    const requestUri = this.url + `/single-view-asn?ipAddress=${ipAddress}`;

    return this.httpClient.get(requestUri).pipe(
      catchError(
        (err) => {
          console.error("error in single view report read ", err);
          return of([]);
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

  apiCallToPrintScanReport(name: string, content: any) {
    let requestUri = this.url + 'pdf';

    let data = {
      'content': content,
      'name': name
    };

    console.log(data);

    return this.httpClient.post(requestUri, data).pipe(
      catchError(err => {
        console.error('error in post print ', err);
        return of([]);
      })
    )
  }
}
