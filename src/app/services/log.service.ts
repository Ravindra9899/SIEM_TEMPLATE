import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  /**
   * The function `getAllDocCount` makes an HTTP GET request to retrieve all logs from the `/api/logs`
   * endpoint and returns an Observable.
   * @returns an Observable of type 'any'.
   */
  getAllDocCount(): Observable<any> {
    let uri = '/api/logs';

    return this.http.get(uri).pipe(
      catchError((err) => {
        console.error('error in getAllDocCount');
        console.error(err);
        return of([]);
      })
    );
  }

  /**
   * The function `getAllPlaceholders` makes an HTTP GET request to retrieve all placeholders from an
   * API and returns an Observable.
   * @returns an Observable of type 'any'.
   */
  getAllPlaceholders(): Observable<any> {
    let uri = '/api/placeholder';

    return this.http.get(uri).pipe(
      catchError((err) => {
        console.error('error in getAllPlaceholders');
        console.error(err);
        return of([]);
      })
    );
  }

  /**
   * The function `getDatasetNameForLog` sends a POST request to the `/api/check-pattern` endpoint with
   * a log message as the request body, and returns an Observable that emits the response from the
   * server.
   * @param {string} log - The `log` parameter is a string that represents a log entry.
   * @returns The function `getDatasetNameForLog` returns an Observable.
   */
  getDatasetNameForLog(log: string): Observable<any> {

    let uri = '/api/check-pattern';

    let reqBody = {
      'log': log
    }

    return this.http.post(uri, reqBody).pipe(
      catchError((err) => {
        console.log('error in getDatasetNameForLog');
        console.log(err['error']);
        // console.error(JSON.stringify(err));
        if(
          err['error'] != null &&
          err['error']['message']!=null &&
          err['error']['message'].toString().trim()=='not found'
          ){
          return of(err['error']);
        }
        return of([]);
      })
    );
  }

  /**
   * The function `getAllDataset` makes an HTTP GET request to retrieve all datasets from the specified
   * API endpoint and returns an Observable that emits the response data.
   * @returns an Observable of type 'any'.
   */
  getAllDataset(): Observable<any> {
    let uri = '/api/dataset';

    return this.http.get(uri).pipe(
      catchError((err) => {
        console.error('error in getAllDataset');
        console.error(err);
        return of([]);
      })
    );
  }

  /**
   * The function `postPatternForDataset` sends a POST request to the `/api/dataset-tag-pattern`
   * endpoint with the provided pattern and selected dataset name as the request body.
   * @param {any} patternFormData - The `patternFormData` parameter is an object that contains the form
   * data for the pattern. It has two properties:
   * @returns an Observable<any>.
   */
  postPatternForDataset(patternFormData: any): Observable<any> {
    let uri = '/api/dataset-tag-pattern';

    let reqBody = {
      'tagName': patternFormData['pattern'],
      'datasetName': patternFormData['selectedDataset']
    }

    console.log("sent data:::::", reqBody);

    return this.http.post(uri, reqBody).pipe(
      catchError((err) => {
        console.error('error in datasettagpatternadd');
        console.error(err);
        return of([]);
      })
    );
  }
}
