import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private url = '/api/';

  constructor(private httpClient: HttpClient) { }

  apiCallToGetSingleViewAsn(ipAddress: string): Observable<any> {

    const requestUri1 = this.url + `/single-view-asn?ipAddress=${ipAddress}`;

    return this.httpClient.get(requestUri1);
  }
}
