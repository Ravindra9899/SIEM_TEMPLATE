import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  // const baseUri = '';

  constructor(private http: HttpClient) { }

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
}
