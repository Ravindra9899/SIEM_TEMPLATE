import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of, timeout } from 'rxjs';

/* It sends a POST request to the backend with the given source IP address and the maximum number of
children to be returned */
@Injectable({
  providedIn: 'root',
})
export class DestinationIpsService {
  constructor(private http: HttpClient) {}

  /**
   * It makes a post request to the backend and returns an observable.
   * @param {string} sourceIpAddress - The IP address of the source node.
   * @param {string} maxNoOfChildren - This is the maximum number of children that you want to see for
   * a particular node.
   * @returns An observable of type any.
   */
  getDestinationIpsForAllIndices(
    sourceIpAddress: string,
    maxNoOfChildren: string
  ): Observable<any> {
    const postUrl = `${environment.backendBaseUrl}/dest-ips`;
    return this.http
      .post(postUrl, {
        inputIpAddress: sourceIpAddress,
        maxNoOfChildren: maxNoOfChildren,
      })
      .pipe(
        timeout(environment.TIMEOUT_DURATION),
        catchError((error: HttpErrorResponse) => {
          return of({ error: error.message });
        })
      );
  }
}
